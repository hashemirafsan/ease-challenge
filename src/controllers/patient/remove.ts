import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Patient from '../../models/Patient';

const remove: RequestHandler = async (req: Request, res) => {
  const { patientId } = req.params;

  const patient = Patient.find({ id: patientId }).value();
  
  if (!patient) {
    return res.status(404).send({
      error: 'Patient not found'
    });
  }

  Patient.remove({ id: patientId }).write();
  
  return res.status(204).send();
};

export default requestMiddleware(remove);