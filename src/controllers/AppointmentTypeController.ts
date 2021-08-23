import { getRepository, getConnection } from 'typeorm';
import AppointmentType from '../models/AppointmentType';

interface RequestCreate {
	name: String;
}

interface RequestUpdate {
  id: String;
	name: String;
}

class AppointmentTypeController {

  public async fetchAll() {
    const appointmentTypesRepository = getRepository(AppointmentType);
    const appointmentTypes = await appointmentTypesRepository.find();
    return appointmentTypes;
  }

  public async create({ name }: RequestCreate): Promise<AppointmentType> {
    const appointmentTypesRepository = getRepository(AppointmentType);
    const appointmentType = new AppointmentType();
    appointmentType.name = name;

    await appointmentTypesRepository.save(appointmentType);
    return appointmentType;
  }

  public async update({ id, name }: RequestUpdate): Promise<AppointmentType> {
    const appointmentTypesRepository = getRepository(AppointmentType);
    const checkEmailExists = await appointmentTypesRepository.findOne({
      where: { name }
    });

    if(checkEmailExists) {
      throw new Error('Este nome já está sendo utilizado.');
    } else {
      const updateAppointmentType = { name: name };
      Object.keys(updateAppointmentType).forEach(key => updateAppointmentType[key] === undefined ? delete updateAppointmentType[key] : {})
      await getConnection()
        .createQueryBuilder()
        .update(AppointmentType)
        .set(updateAppointmentType)
        .where({ id: id })
        .execute();
      return;
    }
  }
}

export default AppointmentTypeController
