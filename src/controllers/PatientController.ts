import { getRepository, getConnection } from 'typeorm';
import Patient from '../models/Patient';

interface RequestCreate {
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

class PatientController {

  public async fetchAll() {
    const patientsRepository = getRepository(Patient);
    const patients = await patientsRepository.find();
    return patients;
  }

  public async create({ name, phone, record }: RequestCreate): Promise<Patient> {
    const patientsRepository = getRepository(Patient);
    const patient = new Patient();
    patient.name = name;
    patient.phone = phone;
    patient.record = record;

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
}

export default PatientController
