import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Group } from '../entity/Group';

const router = Router();

// Get all Groups
router.get('/', async (req, res) => {
  const groupRepository = AppDataSource.getRepository(Group);
  const groups = await groupRepository.find({ relations: ["users", "dataTypes"] });
  res.json(groups);
});

// Get Group by ID
router.get('/:id', async (req, res) => {
  const groupRepository = AppDataSource.getRepository(Group);
  const group = await groupRepository.findOne({
    where: { id: Number(req.params.id) },
    relations: ["users", "dataTypes"]
  });
  if (group) {
    res.json(group);
  } else {
    res.status(404).send('Group not found');
  }
});

export default router;