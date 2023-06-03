import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Patient from '../../models/Patient';

const all: RequestHandler = async (req, res) => {
  const patients = Patient.sortBy('createdAt').value();
  return res.send({ patients });
};

export default requestMiddleware(all);