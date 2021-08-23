import { Router } from 'express';
const appointmentTypeRouter = Router();

import AppointmentTypeController from '../controllers/AppointmentTypeController'
const appointmentTypeController = new AppointmentTypeController();

appointmentTypeRouter.get('/', async (req, res) => {
  try {
    const appointmentTypes = await appointmentTypeController.fetchAll();
    return res.json(appointmentTypes);
  } catch (error) {
    res.json({ message: "Problema ao buscar tipos de compromissos. Erro: " + error});
  }
});

appointmentTypeRouter.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const appointmentType = await appointmentTypeController.create({
      name
    });
    return res.json(appointmentType); 
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o tipo de compromisso. Erro: " + error});
  }
})

appointmentTypeRouter.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    await appointmentTypeController.update({
      id, name
    })

    return res.json({message: "O usuário foi alterado com sucesso"})
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o tipo de compromisso. Erro: " + error});
  }
})

appointmentTypeRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await appointmentTypeController.delete({ id });
    return res.json({ message: "O tipo de compromisso foi removido com sucesso." })
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o tipo de compromisso. Erro: " + error});
  }
})

export default appointmentTypeRouter;