import { getRepository, getConnection } from 'typeorm';
import Patient from '../models/Patient';
import User from '../models/User';

interface RequestCreate {
  user: User;
	name: String;
	phone: String;
	record: String;
  email: String;
  address: String;
}

interface RequestUpdate {
  id: String;
	name: String;
	phone: String;
	record: String;
  email: String;
  address: String;
}

interface RequestDelete {
  id: String;
}

class PatientController {

  public async fetchAll(id) {
    const patientsRepository = getRepository(Patient);
    const patients = await patientsRepository.find({ user: id });
    return patients;
  }

  public async create({ name, phone, record, user, email, address }: RequestCreate): Promise<Patient> {
    const patientsRepository = getRepository(Patient);
    const patient = new Patient();
    patient.name = name;
    patient.phone = phone;
    patient.record = record;
    patient.user = user;
    patient.email = email;
    patient.address = address;
    await patientsRepository.save(patient);
    return patient;
  }

  public async update({ id, name, phone, record, email, address}: RequestUpdate): Promise<Patient> {
    const updatePatient = { name: name, phone: phone, record: record, email: email, address: address };
    Object.keys(updatePatient).forEach(key => updatePatient[key] === undefined ? delete updatePatient[key] : {})
    await getConnection()
      .createQueryBuilder()
      .update(Patient)
      .set(updatePatient)
      .where({ id: id })
      .execute();
    return;
  }

  public async delete({ id }: RequestDelete): Promise<Patient> {
    const manager = getConnection().manager;
    await manager.query(`UPDATE appointments SET patientId = NULL WHERE patientId = '${id}';`);	
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Patient)
      .where({ id: id })
      .execute();
    return;
  }
}

export default PatientController
