import { Router } from 'express';
const providerRouter = Router();

import ProviderController from '../controllers/ProviderController'
const providerController = new ProviderController();

providerRouter.get('/', async (req, res) => {
  try {
    const providers = await providerController.fetchAll();
    return res.json(providers);
  } catch (error) {
    res.json({ message: "Problema ao buscar usuarios" });
  }
});

providerRouter.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const provider = await providerController.create({
      name
    });
    return res.json(provider); 
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o Dentista" + error});
  }
})

providerRouter.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;

    await providerController.update({
      id, name
    })

    return res.json({message: "O Dentista foi alterado com sucesso"})
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o dentista" + error});
  }
})

export default providerRouter;