import { getRepository, getConnection } from 'typeorm';
import User from '../models/User';

interface RequestCreate {
  name: String;
  email: String;
  password: String;
}

interface RequestUpdate {
  id: String;
  name: String;
  email: String;
  password: String;
}

interface RequestDelete {
  id: String;
}

interface RequestLogin {
  email: String;
  password: String;
}

class UserController {

  public async fetchAll() {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();
    return users;
  }

  public async create({ name, email, password }: RequestCreate): Promise<User> {
    const usersRepository = getRepository(User);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    await usersRepository.save(user);
    return user;
  }

  public async update({ id, name, email, password }: RequestUpdate): Promise<User> {
    const usersRepository = getRepository(User);
    // const checkEmailExists = await usersRepository.findOne({
    //   where: { email }
    // });
    // if (checkEmailExists) {
    //   throw new Error('Email já está sendo utilizado.');
    // } else {
    const updateUser = { name: name, email: email, password: password };
    Object.keys(updateUser).forEach(key => updateUser[key] === undefined ? delete updateUser[key] : {})
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set(updateUser)
      .where({ id: id })
      .execute();
    return;
    // }
  }

  public async delete({ id }: RequestDelete): Promise<User> {
    const manager = getConnection().manager;
    await manager.query(`DELETE FROM providers_users WHERE userId = '${id}';`);
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where({ id: id })
      .execute();
    return;
  }
}

export default UserController
