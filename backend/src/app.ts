import express from 'express';
import cors from 'cors'
import { config } from 'dotenv';

import contactRouter from './routes/contactRoute';
import accessRouter from './routes/accessRoute';

import { testConnection } from './services/sqlService';
import { ValidateAuth } from './middleware/autentication';

config();

const port = process.env.__APP_PORT__;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/access', accessRouter);
app.use('/contact', ValidateAuth, contactRouter);

testConnection();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
