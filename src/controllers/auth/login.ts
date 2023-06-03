import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import Manager from '../../models/Manager';
import * as Bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';

export const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().max(20),
});

interface LoginReqBody {
    email: string;
    password: string;
}

const login: RequestHandler = async (req: Request<{}, {}, LoginReqBody>, res) => {
  const { email, password } = req.body;
  
  const manager = Manager.find({ email }).value();

  if (!manager) {
    return res.status(404).json({
        message: "User not found!"
    });
  }

  if (!Bcrypt.compareSync(password, manager.password)) {
    return res.status(404).json({
        message: "User not found1!"
    });
  }

  return res.status(200).json({
    token: JWT.sign(manager, JWT_SECRET)
  })
};

export default requestMiddleware(login, { validation: { body: loginSchema } });