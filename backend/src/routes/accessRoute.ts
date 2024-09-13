import { Router } from 'express';
import { login, logon } from '../controllers/accessController';

const accessRouter = Router();

accessRouter.post('/login', login)
accessRouter.post('/logon', logon)


export default accessRouter;
