import { getRepository, getConnection } from 'typeorm';
import Patient from '../models/Patient';
import User from '../models/User';


interface RequestCreate {
  user: User;
	name: String;
	phone: String;
	record: String;
}

interface RequestUpdate {
  id: String;
	name: String;
	phone: String;
	record: String;
}

interface RequestDelete {
  id: String;
}

class PatientController {

  public async fetchAll() {
    const patientsRepository = getRepository(Patient);
    const patients = await patientsRepository.find();
    return patients;
  }

  public async create({ name, phone, record, user }: RequestCreate): Promise<Patient> {
    const patientsRepository = getRepository(Patient);
    const patient = new Patient();
    patient.name = name;
    patient.phone = phone;
    patient.record = record;
    patient.user = user;
    await patientsRepository.save(patient);
    return patient;
  }

  public async update({ id, name, phone, record }: RequestUpdate): Promise<Patient> {
    const updatePatient = { name: name, phone: phone, record: record };
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
