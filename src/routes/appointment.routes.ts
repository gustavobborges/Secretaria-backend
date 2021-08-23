import { Router } from 'express';
const appointmentRouter = Router();

import AppointmentController from '../controllers/AppointmentController'
const appointmentController = new AppointmentController();

appointmentRouter.get('/', async (req, res) => {
  try {
    const appointments = await appointmentController.fetchAll();
    return res.json(appointments);
  } catch (error) {
    res.json({ message: "Problema ao buscar usuarios" });
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
    return res.json({message: "Não foi possível cadastrar o compromisso" + error});
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
    return res.json({message: "Não foi possível cadastrar o compromisso" + error});
  }
})

export default appointmentRouter;