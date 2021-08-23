import { Router } from 'express';
const appointmentRouter = Router();

import AppointmentController from '../controllers/AppointmentController'
const appointmentController = new AppointmentController();

appointmentRouter.get('/', async (req, res) => {
  try {
    const appointments = await appointmentController.fetchAll();
    return res.json(appointments);
  } catch (error) {
    res.json({ message: "Não foi possível cadastrar os usuarios. Erro: " });
  }
});

appointmentRouter.post('/', async (req, res) => {
  try {
    const { name, provider, patient, appointmentType, place, description, initialDate, finalDate } = req.body;
    const appointment = await appointmentController.create({
      name,
      provider,
      patient, 
      appointmentType, 
      place, 
      description, 
      initialDate, 
      finalDate
    });
    return res.json(appointment); 
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o compromisso. Erro: " + error});
  }
})

appointmentRouter.put('/:id', async (req, res) => {
  try {
    const { name, provider, patient, appointmentType, place, description, initialDate, finalDate } = req.body;
    const { id } = req.params;
    await appointmentController.update({
      id, name, provider, patient, appointmentType, place, description, initialDate, finalDate
    })

    return res.json({message: "O compromisso foi alterado com sucesso"})
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o compromisso. Erro: " + error});
  }
})

appointmentRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await appointmentController.delete({ id });
    return res.json({ message: "O compromisso foi removido com sucesso." })
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o compromisso. Erro: " + error});
  }
})

export default appointmentRouter;