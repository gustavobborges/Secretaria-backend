import { Router } from 'express';
const patientRouter = Router();

import PatientController from '../controllers/PatientController'
const patientController = new PatientController();

patientRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const patients = await patientController.fetchAll(id);
    return res.json(patients);
  } catch (error) {
    res.json({ message: "Não foi possível buscar usuarios. Erro: " + error });
  }
});

patientRouter.post('/', async (req, res) => {
  try {
    const { name, phone, record, user, email, address } = req.body;
    const patient = await patientController.create({
      name,
      phone,
      record,
      user,
      email,
      address,
    });
    return res.json(patient); 
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o paciente. Erro: " + error});
  }
})

patientRouter.put('/:id', async (req, res) => {
  try {
    const { name, phone, record, email, address } = req.body;
    const { id } = req.params;

    await patientController.update({
      id, name, phone, record, email, address
    })

    return res.json({message: "O paciente foi alterado com sucesso"})
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o paciente. Erro: " + error});
  }
});

patientRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await patientController.delete({ id });
    return res.json({ message: "O paciente foi removido com sucesso." })
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o paciente. Erro: " + error});
  }
})

export default patientRouter;