import { Request, Response } from 'express';
import { NewQuery } from '../services/sqlService';
import { Contact } from '../models/contactModel';
import { v4 } from 'uuid';
import { CreateContactQuery, DeleteContactQuery, GetContactQuery, GetContactsQuery, UpdateContactQuery } from '../models/sqlQueries';

export const getContacts = async (_: Request, res: Response) => {
  const [contacts] = await NewQuery<Contact>(GetContactsQuery);
  res.json(contacts);
};

export const getContact = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  if (!contactId) {
    res.status(400).json({ message: 'No contact id was provided' });
    return
  }

  const [contact, _] = await NewQuery<Contact>(GetContactQuery, [contactId]) as [Contact[], any];
  res.json(contact[0]);
};

export const createContact = async (req: Request, res: Response) => {
  const newContact: Contact = { id: v4(), name: req.body.name, phone_number: req.body.phone_number, email: req.body.email, image_url: req.body.image_url };

  try {
    await NewQuery(CreateContactQuery, [newContact.id, newContact.name, newContact.phone_number, newContact.email, newContact.image_url]);

    res.status(201).json({ ok: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message || error });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  if (!contactId) {
    res.status(400).json({ message: 'No contact id was provided' });
    return
  }

  try {
    await NewQuery(UpdateContactQuery, [req.body.name, req.body.phone_number, req.body.email, req.body.image_url, contactId]);
    res.status(200).json({ ok: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message || error });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  if (!contactId) {
    res.status(400).json({ message: 'No contact id was provided' });
    return
  }

  try {
    await NewQuery(DeleteContactQuery, [contactId]);
    res.status(200).send({ ok: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message || error });
  }
};
