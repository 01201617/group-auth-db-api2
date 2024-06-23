import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Group } from '../entity/Group';
import { DataType } from '../entity/DataType';
import { Data } from '../entity/Data';

const createData = async () => {
  try {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);
    const groupRepository = AppDataSource.getRepository(Group);
    const dataTypeRepository = AppDataSource.getRepository(DataType);
    const dataRepository = AppDataSource.getRepository(Data);

    // データの作成
    const data1 = new Data();
    data1.name = 'Financial Report';
    await dataRepository.save(data1);

    const data2 = new Data();
    data2.name = 'Employee Data';
    await dataRepository.save(data2);

    const data3 = new Data();
    data3.name = 'Budget Plan';
    await dataRepository.save(data3);

    // データタイプの作成
    const dataType1 = new DataType();
    dataType1.name = 'Finance';
    dataType1.data = [data1, data3];
    await dataTypeRepository.save(dataType1);

    const dataType2 = new DataType();
    dataType2.name = 'HR';
    dataType2.data = [data2];
    await dataTypeRepository.save(dataType2);

    // グループの作成
    const group1 = new Group();
    group1.name = 'Admin Group';
    group1.permission = 'EDIT';
    group1.dataTypes = [dataType1, dataType2];
    await groupRepository.save(group1);

    const group2 = new Group();
    group2.name = 'Viewer Group';
    group2.permission = 'VIEW';
    group2.dataTypes = [dataType1];
    await groupRepository.save(group2);

    // ユーザーの作成
    const user1 = new User();
    user1.name = 'John Doe';
    user1.groups = [group1, group2];
    await userRepository.save(user1);

    const user2 = new User();
    user2.name = 'Jane Smith';
    user2.groups = [group2];
    await userRepository.save(user2);

    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error:', error);
  }
};

createData().then(() => console.log('Data created.'));
