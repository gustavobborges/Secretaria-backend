import { getRepository, getConnection } from 'typeorm';
import Appointment from '../models/Appointment';
import Provider from '../models/Provider';
import Patient from '../models/Patient';
import AppointmentType from '../models/AppointmentType';

interface RequestCreate {
  name: String;
  provider: Provider;
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
  provider: Provider;
  patient: Patient;
  appointmentType: AppointmentType;
  place: String;
  description: String;
  initialDate: Date;
  finalDate: Date;
}

interface RequestDelete {
  id: String;
}

class AppointmentController {

  public async fetchAll() {
    const appointmentsRepository = getRepository(Appointment);
    const appointments = await appointmentsRepository.find();
    return appointments;
  }

  public async create({ name, provider, patient, appointmentType, place, description, initialDate, finalDate }: RequestCreate): Promise<Appointment> {
    const appointmentsRepository = getRepository(Appointment);
    const appointment = new Appointment();
    appointment.name = name;
    appointment.provider = provider;
    appointment.patient = patient;
    appointment.appointmentType = appointmentType;
    appointment.place = place;
    appointment.description = description;
    appointment.initialDate = initialDate;
    appointment.finalDate = finalDate;
    await appointmentsRepository.save(appointment);
    return appointment;
  }

  public async update({ id, name, provider, patient, appointmentType, place, description, initialDate, finalDate }: RequestUpdate): Promise<Appointment> {
    const updateAppointment = {
      name: name,
      provider: provider,
      patient: patient,
      appointmentType: appointmentType,
      place: place,
      description: description,
      initialDate: initialDate,
      finalDate: finalDate,
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
