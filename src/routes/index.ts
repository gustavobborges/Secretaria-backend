import { Router } from 'express';
const router = Router();

import UserRouter from './user.routes';
import AppointmentRouter from './appointment.routes';
import AppointmentTypeRouter from './appointmentType.routes';
import PatientRouter from './patient.routes';

router.use('/user', UserRouter);
router.use('/appointment', AppointmentRouter);
router.use('/appointmentType', AppointmentTypeRouter);
router.use('/patient', PatientRouter);

export default router;