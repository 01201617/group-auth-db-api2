import { AppDataSource } from '../data-source';
import { Condition } from '../entity/Condition';

const addConditions = async () => {
  await AppDataSource.initialize();

  const conditionRepository = AppDataSource.getRepository(Condition);

  const conditions = [
    { place: 'Office', method: 'Report' },
    { place: 'Home', method: 'Email' },
    { place: 'Conference', method: 'Presentation' }
  ];

  for (const condition of conditions) {
    const newCondition = conditionRepository.create(condition);
    await conditionRepository.save(newCondition);
  }

  await AppDataSource.destroy();
};

addConditions().catch(console.error);
