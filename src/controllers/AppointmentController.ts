import { getRepository, getConnection } from 'typeorm';
import Appointment from '../models/Appointment';
import User from '../models/User';
import Patient from '../models/Patient';
import AppointmentType from '../models/AppointmentType';

interface RequestCreate {
  name: String;
  user: User;
  patient: Patient;
  appointmentType: AppointmentType;
  place: String;
  description: String;
  initialDate: Date;
  finalDate: Date;
}

interface RequestUpdate {
  id: String;
  name: String;
  patient: Patient;
  appointmentType: AppointmentType;
  place: String;
  description: String;
  initialDate: Date;
  finalDate: Date;
}

interface RequestUpdateConfirmationSended {
  id: String;
  confirmationSendedDate: Date;
  confirmationStatus: String;
}

interface RequestUpdateConfirmationResponsed {
  id: String;
  confirmationResponsedDate: Date;
  confirmationStatus: String;
}


interface RequestDelete {
  id: String;
}

class AppointmentController {

  public async fetchAll(id) {
    const appointmentsRepository = getRepository(Appointment);
    const appointments = await (await appointmentsRepository.find({
      relations: ["user", "patient", "appointmentType"],
      where: {
        user: id
      },
    }));
    return appointments;
  }

  public async create({ 
      name, 
      user, 
      patient, 
      appointmentType, 
      place, 
      description, 
      initialDate,
      finalDate
   }: RequestCreate): Promise<Appointment> {
    const appointmentsRepository = getRepository(Appointment);
    const appointment = new Appointment();
    appointment.name = name;
    appointment.user = user;
    appointment.patient = patient;
    appointment.appointmentType = appointmentType;
    appointment.place = place;
    appointment.description = description;
    appointment.initialDate = initialDate;
    appointment.finalDate = finalDate;

    await appointmentsRepository.save(appointment);
    return appointment;
  }

  public async update({ 
      id,
      name,
      patient,
      appointmentType,
      place,
      description,
      initialDate,
      finalDate
    }: RequestUpdate): Promise<Appointment> {
    const updateAppointment = {
      name: name,
      patient: patient,
      appointmentType: appointmentType,
      place: place,
      description: description,
      initialDate: initialDate,
      finalDate: finalDate
    };
    Object.keys(updateAppointment).forEach(key => updateAppointment[key] === undefined ? delete updateAppointment[key] : {})
    await getConnection()
      .createQueryBuilder()
      .update(Appointment)
      .set(updateAppointment)
      .where({ id: id })
      .execute();
    return;
  }

  public async updateConfirmationSended({ 
    id,
    confirmationSendedDate,
    confirmationStatus
    }: RequestUpdateConfirmationSended): Promise<Appointment> {
    const updateAppointment = {
      confirmationSendedDate: confirmationSendedDate,
      confirmationStatus: confirmationStatus
    };
    Object.keys(updateAppointment).forEach(key => updateAppointment[key] === undefined ? delete updateAppointment[key] : {})
    await getConnection()
      .createQueryBuilder()
      .update(Appointment)
      .set(updateAppointment)
      .where({ id: id })
      .execute();
    return;
  }

  public async updateConfirmationResponsed({ 
    id,
    confirmationResponsedDate,
    confirmationStatus
    }: RequestUpdateConfirmationResponsed): Promise<Appointment> {
    const updateAppointment = {
      confirmationResponsedDate: confirmationResponsedDate,
      confirmationStatus: confirmationStatus
    };
    Object.keys(updateAppointment).forEach(key => updateAppointment[key] === undefined ? delete updateAppointment[key] : {})
    await getConnection()
      .createQueryBuilder()
      .update(Appointment)
      .set(updateAppointment)
      .where({ id: id })
      .execute();
    return;
  }
  
  public async delete({ id }: RequestDelete): Promise<Appointment> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Appointment)
      .where({ id: id })
      .execute();
    return;
  }
}

export default AppointmentController
