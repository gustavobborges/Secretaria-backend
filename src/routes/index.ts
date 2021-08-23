import { Router } from 'express';
const router = Router();

import UserRouter from './user.routes';
import ProviderRouter from './provider.routes';
import AppointmentRouter from './appointment.routes';
import appointmentTypeRouter from './appointmentType.routes';
import patientRouter from './patient.routes';

router.use('/user', UserRouter);
router.use('/provider', ProviderRouter);
router.use('/appointment', AppointmentRouter);
router.use('/appointmentType', appointmentTypeRouter);
router.use('/patient', patientRouter);

export default router;