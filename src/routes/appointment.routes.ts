import { Router } from 'express';
import axios from 'axios';
const appointmentRouter = Router();

import AppointmentController from '../controllers/AppointmentController'
const appointmentController = new AppointmentController();

appointmentRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointments = await appointmentController.fetchAll(id);
    return res.json(appointments);
  } catch (error) {
    res.json({ message: "Não foi possível cadastrar os usuarios. Erro: " });
  }
});

appointmentRouter.post('/', async (req, res) => {
  try {
    const { name, user, patient, appointmentType, place, description, initialDate, finalDate } = req.body;
    const appointment = await appointmentController.create({
      name,
      user,
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
    const { name, patient, appointmentType, place, description, initialDate, finalDate } = req.body;
    const { id } = req.params;
    await appointmentController.update({
      id, name, patient, appointmentType, place, description, initialDate, finalDate
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

appointmentRouter.post('/sendMessage/:id', async (req, res) => {
  try {
    console.log(req.body);
    const { phone, userName, initialDate } = req.body;
    const { id } = req.params;

    axios.post('http://localhost:8080/sendMessage', {
      messageText: 'Voce confirma sua consulta?',
      phone: phone,
    })

    return res.json({message: "Mensagem enviada com sucesso!"})
  } catch (error) {
    return res.json({message: "Mensagem não enviada. Erro: " + error});
  }
})




export default appointmentRouter;