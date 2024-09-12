import { Request, Response } from 'express';
import { NewQuery } from '../services/sqlService';
import { Contact } from '../models/contactModel';
import { v4 } from 'uuid';

export const getContacts = async (_: Request, res: Response) => {
  const [contacts, __] = await NewQuery(`select * from contacts;`);
  res.json(contacts);
};

export const getContact = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  if (!contactId) {
    res.status(400).send('No contact id was provided');
    return
  }

  const [contact, _] = await NewQuery(`select * from contacts where id = ?`, [contactId]) as [Contact[], any];
  res.json(contact[0]);
};

export const createContact = async (req: Request, res: Response) => {
  const newContact: Contact = { id: v4(), name: req.body.name, phone_number: req.body.phone_number, email: req.body.email, image_url: req.body.image_url };

  try {
    const query = `insert into contacts(id, name, phone_number, email, image_url) values(?,?,?,?,?)`;
    await NewQuery(query, [newContact.id, newContact.name, newContact.phone_number, newContact.email, newContact.image_url]);

    res.status(201).send({ ok: true });
  } catch (error) {
    res.status(500).send({ ok: false });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  if (!contactId) {
    res.status(400).send('No contact id was provided');
    return
  }

  const query = `update contacts
  set name = ?, phone_number = ?, email = ?, image_url = ?
  where id = ?`;

  try {
    await NewQuery(query, [req.body.name, req.body.phone_number, req.body.email, req.body.image_url, contactId]);
    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(500).send({ ok: false });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  if (!contactId) {
    res.status(400).send('No contact id was provided');
    return
  }

  try {
    await NewQuery(`delete from contacts where id = ?`, [contactId]);
    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(500).send({ ok: false });
  }
};
