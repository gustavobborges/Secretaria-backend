import { Router } from 'express';
import { getRepository, getConnection } from 'typeorm';

const userRouter = Router();

import User from '../models/User';

import UserController from '../controllers/UserController'
const userController = new UserController();

userRouter.get('/', async (req, res) => {
  try {
    const users = await userController.fetchAll();
    return res.json(users);
  } catch (error) {
    res.json({ message: "Problema ao buscar usuarios" });
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
    return res.json(user); 
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o usuário" + error});
  }
})

userRouter.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;

    await userController.update({
      id, name, email, password
    })

    return res.json({message: "O usuário foi alterado com sucesso"})
  } catch (error) {
    // return res.json({message: "Não foi possível cadastrar o usuário" + error});
    return res.json(error);

  }
})

export default userRouter;