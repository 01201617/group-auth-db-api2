import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { DataType } from '../entity/DataType';

const router = Router();

// Get all DataTypes
router.get('/', async (req, res) => {
  const dataTypeRepository = AppDataSource.getRepository(DataType);
  const dataTypes = await dataTypeRepository.find({ relations: ["group", "data"] });
  res.json(dataTypes);
});

// Get DataType by ID
router.get('/:id', async (req, res) => {
  const dataTypeRepository = AppDataSource.getRepository(DataType);
  const dataType = await dataTypeRepository.findOne({
    where: { id: Number(req.params.id) },
    relations: ["group", "data"]
  });
  if (dataType) {
    res.json(dataType);
  } else {
    res.status(404).send('DataType not found');
  }
});

export default router;