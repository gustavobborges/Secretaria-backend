import { Router } from 'express';
const providerRouter = Router();

import ProviderController from '../controllers/ProviderController'
const providerController = new ProviderController();

providerRouter.get('/', async (req, res) => {
  try {
    const providers = await providerController.fetchAll();
    return res.json(providers);
  } catch (error) {
    res.json({ message: "Não foi possível buscar dentistas. Erro: " + error});
  }
});

providerRouter.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const provider = await providerController.create({
      name,
      
    });
    return res.json(provider); 
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o dentista. Erro: " + error});
  }
})

providerRouter.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;

    await providerController.update({
      id, name
    })

    return res.json({message: "O dentista foi alterado com sucesso"})
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o dentista. Erro: " + error});
  }
});

providerRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await providerController.delete({ id });
    return res.json({ message: "O dentista foi removido com sucesso." })
  } catch (error) {
    return res.json({message: "Não foi possível cadastrar o dentista. Erro: " + error});
  }
})

export default providerRouter;