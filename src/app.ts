import bodyParser from 'body-parser';
import compression from 'compression';
import express, { Request, Response, NextFunction } from 'express';
import ApplicationError from './errors/application-error';
import routes from './routes';
import logger from './logger';

const app = express();


function logResponseTime(req: Request, res: Response, next: NextFunction) {
    const startHrTime = process.hrtime();

    res.on('finish', () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs =
            elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        const message = `${req.method} ${res.statusCode} ${elapsedTimeInMs}ms\t${req.path}`;
        logger.log({
            level: 'debug',
            message,
            consoleLoggerOptions: { label: 'API' },
        });
    });

    next();
}

app.use(logResponseTime);

app.get('/health', function(req, res) {
    res.status(200).json({ message: 'Application Healthy!' });
})

app.use(compression() as any);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', routes);

app.use(
    (
        err: ApplicationError,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (res.headersSent) {
            return next(err);
        }

        return res.status(err.status || 500).json({
            error: err.message,
        });
    }
);

export default app;
