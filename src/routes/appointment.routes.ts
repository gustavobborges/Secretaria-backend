import { Router } from 'express';
import axios from 'axios';
const appointmentRouter = Router();

import AppointmentController from '../controllers/AppointmentController'
import { formatDateTime } from '../services/dateFormatter';
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
    });

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
    const { phone, patient, userName, initialDate, confirmationSendedDate, confirmationStatus } = req.body;
    const { id } = req.params;
    const newDate = formatDateTime(new Date(initialDate));
    
    axios.post('http://localhost:8080/sendMessage', {
      messageText: 
      `Olá, ${patient}!\nVoce confirma sua consulta com ${userName} no dia ${newDate}?\n\nDigite:\n1 - Confirmar\n2 - Não irei comparecer`,
      phone: phone,
      appointmentId: id
    });

    await appointmentController.updateConfirmationSended({
      id, confirmationSendedDate, confirmationStatus
    })

    return res.json({message: "O compromisso foi alterado com sucesso", success: true})
  } catch (error) {
    return res.json({message: "Mensagem não enviada. Erro: " + error, success: false});
  }
})


appointmentRouter.post('/messageResponse/:id', async (req, res) => {
  try {
    console.log(req.body);
    const { response: confirmationStatus, date: confirmationResponsedDate } = req.body;
    const { id } = req.params;

    await appointmentController.updateConfirmationResponsed({
      id, confirmationResponsedDate, confirmationStatus
    })

    return res.json({message: "O status do compromisso foi alterado com sucesso", success: true})
  } catch (error) {
    return res.json({message: "Não foi possível alterar a confirmação. Erro: " + error, success: false});
  }
})




export default appointmentRouter;