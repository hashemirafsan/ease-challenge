import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Patient from '../../models/Patient';

const get: RequestHandler = async (req: Request, res) => {
  const { patientId } = req.params;

  const patient = Patient.find({ id: patientId }).value();
  
  if (!patient) {
    return res.status(404).send({
      error: 'Patient not found'
    });
  }

  return res.status(200).send({
    patient
  });
};

export default requestMiddleware(get);