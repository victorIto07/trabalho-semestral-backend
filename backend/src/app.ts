import express from 'express';
import contactRouter from './routes/contactRoute';
import { testConnection } from './services/sqlService';
import { config } from 'dotenv';
import cors from 'cors'

config();
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use('/contact', contactRouter);

testConnection();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
