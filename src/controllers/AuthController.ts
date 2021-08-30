import { getRepository } from 'typeorm';
import User from '../models/User';
import * as jwt from '../services/jwt';

interface RequestLogin {
  email: String;
  password: String;
}

class AuthController {

  public async authMiddleware(req, res, next) {
    const [, token] = req.headers.authorization.split(' ')
    try {
      const payload = jwt.decode(token)
      const usersRepository = getRepository(User);
      const user = await usersRepository.findByIds(payload.user);

      if(!user) {
        return res.send(401);
      }
      next();
    } catch (error) {
      res.json({ message: "Acesso negado." });
    }
  }

  public async getMeAuth(req, res) {
    const [, token] = req.headers.authorization.split(' ')
    try {
      const payload = jwt.decode(token)
      const usersRepository = getRepository(User);
      const user = await usersRepository.findByIds(payload.user);

      if(!user) {
        return res.send(401);
      }
      return user;
    } catch (error) {
      res.json({ message: "Acesso negado." });
    }
  }

  public async login({ email, password }: RequestLogin): Promise<User> {
    // console.log(`email: ${email}`);
    // console.log(`senha: ${password}`)
    const usersRepository = getRepository(User);
    const users = await usersRepository.findOne({
      email: email,
      password: password
    });
    return users
  }
}

export default AuthController
