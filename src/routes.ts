import { Router } from 'express';
import login from './controllers/auth/login';
import * as PatientController from './controllers/patient';
import VerifyAuth from './middleware/verify-auth';

const router = Router();

//Auth Routes
router.post('/auth/login', login);

// Patient routes
router.get('/patients', VerifyAuth, PatientController.all);
router.get('/patients/:patientId', VerifyAuth, PatientController.single);
router.post('/patients/add', VerifyAuth, PatientController.add);
router.put('/patients/:patientId', VerifyAuth, PatientController.update);
router.delete('/patients/:patientId', VerifyAuth, PatientController.remove)

export default router;
