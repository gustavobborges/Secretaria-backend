import { getRepository, getConnection } from 'typeorm';
import Provider from '../models/Provider';

interface RequestCreate {
	name: String;
}

interface RequestUpdate {
  id: String;
	name: String;
}

class ProviderController {

  public async fetchAll() {
    const providersRepository = getRepository(Provider);
    const providers = await providersRepository.find();
    return providers;
  }

  public async create({ name }: RequestCreate): Promise<Provider> {
    const providersRepository = getRepository(Provider);
    const provider = new Provider();
    provider.name = name;

    await providersRepository.save(provider);
    return provider;
  }

  public async update({ id, name }: RequestUpdate): Promise<Provider> { 
    const updateProvider = { name: name };
    Object.keys(updateProvider).forEach(key => updateProvider[key] === undefined ? delete updateProvider[key] : {})
    await getConnection()
      .createQueryBuilder()
      .update(Provider)
      .set(updateProvider)
      .where({ id: id })
      .execute();
    return;
  }
}

export default ProviderController
