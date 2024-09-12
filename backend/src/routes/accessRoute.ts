import { Router } from 'express';
import { Login, Logon } from '../controllers/accessController';

const accessRouter = Router();

accessRouter.post('/login', Login)
accessRouter.post('/logon', Logon)


export default accessRouter;
