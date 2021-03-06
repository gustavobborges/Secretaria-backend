import { Router } from 'express';
import * as jwt from '../services/jwt';
const userRouter = Router();

import UserController from '../controllers/UserController'
import AuthController from '../controllers/AuthController'
const userController = new UserController();
const authController = new AuthController();

userRouter.get('/', async (req, res) => {
  try {
    const users = await userController.fetchAll();
    return res.json(users);
  } catch (error) {
    res.json({ message: "Problema ao buscar usuarios" });
  }
});

userRouter.post('/getByEmail', async (req, res) => {
  try {
    const { email } = req.body;
    const userId = await userController.fetchByEmail({email});
    return res.json({id: userId});
  } catch (error) {
    res.json({ message: "Problema ao buscar usuário por email" });
  }
});


userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userController.create({
      name,
      email,
      password
    });

    const token = jwt.sign({ user: user.id})

    return res.json({user, token});
  } catch (error) {
    return res.json({ message: "Não foi possível cadastrar o usuário" + error });
  }
})

userRouter.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;
    await userController.update({
      id, name, email, password
    });
    return res.json({ message: "O usuário foi alterado com sucesso" })
  } catch (error) {
    return res.json({ message: "Não foi possível cadastrar o usuário. Erro: " + error });

  }
})

userRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await userController.delete({ id });
    return res.json({ message: "O usuário foi removido com sucesso." })
  } catch (error) {
    return res.json({ message: "Não foi possível cadastrar o usuário. Erro: " + error });
  }
})

userRouter.post('/login', async (req, res) => {

  const [, hash] = req.headers.authorization.split(' ')
  const [email, password] = Buffer.from(hash, 'base64')
    .toString()
    .split(':')
  try {
    const user = await authController.login({ email, password });
    if (user) {
      console.log(user)
      const token = jwt.sign({ user: user.id})
      return res.json({user, token})
    } else {
      return res.json({ message: "O login e senha não conferem." })
    }
  } catch (error) {
    return res.json({ message: "Não foi possível realizar o login. Erro: " + error });
  }
})

userRouter.get('/me', authController.authMiddleware, async (req, res) => {
  const user = await authController.getMeAuth(req, res);
  res.send(user);
})

export default userRouter;