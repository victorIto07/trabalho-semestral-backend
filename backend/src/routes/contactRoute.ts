import { Router } from 'express';
import { createContact, deleteContact, getContact, getContacts, updateContact } from '../controllers/contactController';

const contactRouter = Router();

contactRouter.get('/', getContacts);
contactRouter.get('/:id', getContact);

contactRouter.post('/', createContact);
contactRouter.put('/:id', updateContact);
contactRouter.delete('/:id', deleteContact);

export default contactRouter;
