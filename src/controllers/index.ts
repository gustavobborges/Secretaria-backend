const userController = require('../controllers/UserController');
const providerController = require('../controllers/ProviderController');
const appointmentController = require('../controllers/AppointmentController');
const appointmentTypeController = require('../controllers/AppointmentTypeController');
const patientController = require('../controllers/PatientController');

module.exports = {
  userController,
  providerController,
  appointmentController,
  appointmentTypeController,
  patientController
};