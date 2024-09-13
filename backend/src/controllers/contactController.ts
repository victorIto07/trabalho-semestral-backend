import { Request, Response } from 'express';
import { newQuery } from '../services/sqlService';
import { Contact } from '../models/contactModel';
import { CreateContactQuery, DeleteContactQuery, GetContactQuery, GetContactsQuery, UpdateContactQuery } from '../models/sqlQueries';
import { newUUID, userCanEditContact, validateKeys } from '../util';

export const getContacts = async (req: Request, res: Response) => {
  const [contacts] = await newQuery<Contact>(GetContactsQuery);

  const _contacts = [];
  for (const contact of contacts) {
    _contacts.push({ ...contact, canEdit: await userCanEditContact(req.body.userId, contact.id, contact) });
  }

  res.json(_contacts);
};

export const getContact = async (req: Request, res: Response) => {
  if (!validateKeys(req.params, 'id')) {
    res.status(400).json({ message: 'No contact id was provided' });
    return
  }

  const contactId = req.params.id;

  const [contact, _] = await newQuery<Contact>(GetContactQuery, [contactId]) as [Contact[], any];
  res.json(contact[0]);
};

export const createContact = async (req: Request, res: Response) => {
  if (!validateKeys(req.body, 'name', 'phone_number', 'email', 'image_url')) {
    res.status(422).json({ message: 'Invalid payload' });
    return
  }

  const newContact: Contact = {
    id: newUUID(),
    name: req.body.name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    image_url: req.body.image_url,
    user_created_by: req.body.userId
  };

  try {
    await newQuery(CreateContactQuery, [newContact.id, newContact.name, newContact.phone_number, newContact.email, newContact.image_url, newContact.user_created_by]);
    res.status(201).json({ ok: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message || error });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  if (!validateKeys(req.params, 'id')) {
    res.status(400).json({ message: 'No contact id was provided' });
    return
  }

  const contactId = req.params.id;

  if (!validateKeys(req.body, 'name', 'phone_number', 'email', 'image_url')) {
    res.status(422).json({ message: 'Invalid payload' });
    return
  }

  if (!await userCanEditContact(req.body.userId, contactId)) {
    res.status(400).json({ message: 'User cannot update this contact.' });
    return
  }

  try {
    await newQuery(UpdateContactQuery, [req.body.name, req.body.phone_number, req.body.email, req.body.image_url, contactId]);
    res.status(200).json({ ok: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message || error });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  if (!validateKeys(req.params, 'id')) {
    res.status(400).json({ message: 'No contact id was provided' });
    return
  }

  const contactId = req.params.id;


  if (!await userCanEditContact(req.body.userId, contactId)) {
    res.status(400).json({ message: 'User cannot delete this contact.' });
    return
  }

  try {
    await newQuery(DeleteContactQuery, [contactId]);
    res.status(200).send({ ok: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message || error });
  }
};
