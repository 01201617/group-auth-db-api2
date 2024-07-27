import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const router = Router();

// Get all Users
router.get('/', async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({ relations: ["groups"] });
  res.json(users);
});

// Get User by ID
router.get('/:id', async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: Number(req.params.id) },
    relations: ["groups"]
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

export default router;