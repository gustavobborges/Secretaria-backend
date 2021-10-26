const userController = require('../controllers/UserController');
const appointmentController = require('../controllers/AppointmentController');
const appointmentTypeController = require('../controllers/AppointmentTypeController');
const patientController = require('../controllers/PatientController');
const authController = require('../controllers/AuthController');

module.exports = {
  userController,
  appointmentController,
  appointmentTypeController,
  patientController,
  authController
};