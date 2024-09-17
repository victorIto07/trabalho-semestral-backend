import express from 'express';
import cors from 'cors';

import contactRouter from './routes/contactRoute';
import accessRouter from './routes/accessRoute';

import { testConnection } from './services/sqlService';
import { validateAuth } from './middleware/autentication';
import { setupHeader } from './middleware/setup-header';

const port = process.env.__APP_PORT__;
const app = express();

app.use(cors());
app.use(setupHeader);
app.use(express.json());

app.use('/access', accessRouter);
app.use('/contact', validateAuth, contactRouter);

testConnection();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
