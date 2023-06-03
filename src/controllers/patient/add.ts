import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import Patient from '../../models/Patient';
import { v4 as uuidv4 } from 'uuid';

export const addPatientSchema = Joi.object().keys({
    name: Joi.string().required().max(100),
    email: Joi.string().email().required(),
    phone: Joi.string().max(20),
    medications: Joi.object().keys({
        name: Joi.string().required().max(100),
        dosage: Joi.string().required().max(150)
    })
});

interface PatientReqBody {
    name: string;
    email: string;
    phone: string;
}

const add: RequestHandler = async (req: Request<{}, {}, PatientReqBody>, res) => {
  const { name, email, phone } = req.body;

  Patient.push({ 
    id: uuidv4(), 
    name, 
    email,
    phone,
    medications: [], 
    diagnoses: [], 
    treatments: [],
    createdAt: new Date().getTime()
  }).write();
  
  return res.status(201).json({
    message: 'Patient Added Successfully'
  })
};

export default requestMiddleware(add, { validation: { body: addPatientSchema } });