import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Group } from "./entity/Group";
import { DataType } from "./entity/DataType";
import { Data } from "./entity/Data";
import { Condition } from "./entity/Condition";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "yourusername",
  password: process.env.DB_PASSWORD || "yourpassword",
  database: process.env.DB_NAME || "yourdatabase",
  synchronize: true,
  logging: false,
  entities: [User, Group, DataType, Data, Condition],  // すべてのエンティティを含める
  migrations: [],
  subscribers: [],
});
