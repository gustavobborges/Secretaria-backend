import { Router } from 'express';
const patientRouter = Router();

import PatientController from '../controllers/PatientController'
const patientController = new PatientController();

patientRouter.get('/', async (req, res) => {
  try {
    const patients = await patientController.fetchAll();
    return res.json(patients);
  } catch (error) {
    res.json({ message: "Problema ao buscar usuarios" });
  }
});

patientRouter.post('/', async (req, res) => {
  try {
    const { name, phone, record } = req.body;
    const patient = await patientController.create({
      name,
      phone,
      record
    });
    return res.json(patient); 
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o paciente" + error});
  }
})

patientRouter.put('/:id', async (req, res) => {
  try {
    const { name, phone, record } = req.body;
    const { id } = req.params;

    await patientController.update({
      id, name, phone, record
    })

    return res.json({message: "O paciente foi alterado com sucesso"})
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o paciente" + error});
  }
})

export default patientRouter;