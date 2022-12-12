import 'reflect-metadata';
import express from 'express';
import { router } from './routers/routes';

const app = express();
app.use(express.json());
app.use(router);

export default app;
