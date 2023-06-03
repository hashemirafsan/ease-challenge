import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import Patient from '../../models/Patient';

export const addPatientSchema = Joi.object().keys({
    name: Joi.string().max(100),
    email: Joi.string().email(),
    phone: Joi.string().max(20),
    medications: Joi.object().keys({
        name: Joi.string().required().max(100),
        dosage: Joi.string().required().max(150)
    })
});

interface Patient {
    name?: string;
    email?: string;
    phone?: string;
}

const update: RequestHandler = async (req: Request, res) => {
  const { patientId } = req.params;
  const { name, email, phone } = req.body;

  const patientByEmail = Patient.find({ email }).value();

  if (patientByEmail && patientByEmail?.id != patientId) {
    return res.status(422).json({
        error: "Email is already exists!"
    })
  }

  const patientById = Patient.find({ id: patientId }).value();

  if (!patientById) {
    return res.status(404).json({
        error: "Patient not found!"
    })
  }

  const newObj : Patient = {};

  if (name) newObj.name = name;
  if (email) newObj.email = email;
  if (phone) newObj.phone = phone;

  Patient.find({ id: patientId }).assign(newObj).write();
  
  return res.status(200).json({
    message: 'Patient Updated Successfully'
  })
};

export default requestMiddleware(update, { validation: { body: addPatientSchema } });