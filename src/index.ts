import bodyParser from "body-parser";
import express from "express";
import { AppDataSource } from "./data-source";
import dataRoutes from './routes/dataRoutes';
import dataTypeRoutes from './routes/dataTypeRoutes';
import groupRoutes from './routes/groupRoutes';
import userRoutes from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/data', dataRoutes);
app.use('/data-types', dataTypeRoutes);
app.use('/groups', groupRoutes);
app.use('/users', userRoutes);

AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => console.log(error));