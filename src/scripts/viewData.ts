import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Group } from '../entity/Group';
import { DataType } from '../entity/DataType';
import { Data } from '../entity/Data';

const viewData = async () => {
  try {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);
    const groupRepository = AppDataSource.getRepository(Group);
    const dataTypeRepository = AppDataSource.getRepository(DataType);
    const dataRepository = AppDataSource.getRepository(Data);

    const users = await userRepository.find({ relations: ["groups", "groups.dataTypes", "groups.dataTypes.data"] });

    // データを整形して表示
    users.forEach(user => {
      console.log(`User: ${user.name}`);
      user.groups.forEach(group => {
        console.log(`  Group: ${group.name}, Permission: ${group.permission}`);
        group.dataTypes.forEach(dataType => {
          console.log(`    DataType: ${dataType.name}`);
          dataType.data.forEach(data => {
            console.log(`      Data: ${data.name}`);
          });
        });
      });
    });

    // JSON形式で表示
    const result = users.map(user => ({
        id: user.id,
        name: user.name,
        groups: user.groups.map(group => ({
            id: group.id,
            name: group.name,
            permission: group.permission,
            dataTypes: group.dataTypes.map(dataType => ({
            id: dataType.id,
            name: dataType.name,
            data: dataType.data.map(data => ({
                id: data.id,
                name: data.name
            }))
            }))
        }))
        }));

        console.log(JSON.stringify(result, null, 2));

    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error:', error);
  }
};

viewData().then(() => console.log('Data retrieved.'));
