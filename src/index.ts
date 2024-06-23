import express from "express";
import { AppDataSource } from "./data-source";

const app = express();
const port = 3000;

app.use(express.json());

AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => console.log(error));
