import { Router } from 'express';
import { Data } from '../entity/Data';
import { AppDataSource } from '../data-source';

const router = Router();

// Get all Data
router.get('/', async (req, res) => {
    const dataRepository = AppDataSource.getRepository(Data);
    const data = await dataRepository.find({ relations: ["dataType", "condition"] });
    res.json(data);
  });

// Get Data by ID
router.get('/:id', async (req, res) => {
    const dataRepository = AppDataSource.getRepository(Data);
    const data = await dataRepository.findOne({
      where: { id: Number(req.params.id) },
      relations: ["dataType", "condition"]
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Data not found');
    }
  });
  
  export default router;