import { AppDataSource } from '../data-source';
import { Data } from '../entity/Data';
import { Condition } from '../entity/Condition';

const addConditionsToData = async () => {
  await AppDataSource.initialize();

  const dataRepository = AppDataSource.getRepository(Data);
  const conditionRepository = AppDataSource.getRepository(Condition);

  const conditions = await conditionRepository.find();

  const dataList = await dataRepository.find();

  // データをランダムに条件を関連付け
  for (const data of dataList) {
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    data.condition = randomCondition;
    await dataRepository.save(data);
  }

  await AppDataSource.destroy();
};

addConditionsToData().catch(console.error);
