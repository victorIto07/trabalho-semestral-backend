import { Request, Response } from 'express';
import { getContacts as _getContacts, getContact as _getContact, createContact as _createContact, updateContact as _updateContact, deleteContact as _deleteContact } from '../services/contactService';
import { userCanEditContact, validateKeys } from '../util';

export const getContacts = async (req: Request, res: Response) => {
  const contacts = await _getContacts(req.body.userId);
  res.json(contacts);
};

export const getContact = async (req: Request, res: Response) => {
  if (!validateKeys(req.params, 'id')) {
    res.status(400).json({ message: 'No contact id was provided' });
    return;
  }

  try {
    const contact = await _getContact(req.params.id);
    res.json(contact);
  } catch (e: any) {
    res.status(500).json({ message: e.message || e });
  }
};

export const createContact = async (req: Request, res: Response) => {
  if (!validateKeys(req.body, 'name', 'phone_number', 'email', 'image_url')) {
    res.status(422).json({ message: 'Invalid payload' });
    return;
  }

  try {
    await _createContact(req.body);
    res.status(201).json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ message: e.message || e });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  if (!validateKeys(req.params, 'id')) {
    res.status(400).json({ message: 'No contact id was provided' });
    return;
  }

  if (!validateKeys(req.body, 'name', 'phone_number', 'email', 'image_url')) {
    res.status(422).json({ message: 'Invalid payload' });
    return;
  }

  if (!await userCanEditContact(req.body.userId, req.params.id)) {
    res.status(400).json({ message: 'User cannot update this contact.' });
    return;
  }

  try {
    await _updateContact({ ...req.body, ...req.params });
    res.status(200).json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ message: e.message || e });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  if (!validateKeys(req.params, 'id')) {
    res.status(400).json({ message: 'No contact id was provided' });
    return;
  }

  if (!await userCanEditContact(req.body.userId, req.params.id)) {
    res.status(400).json({ message: 'User cannot delete this contact.' });
    return;
  }

  try {
    await _deleteContact(req.params.id);
    res.status(200).send({ ok: true });
  } catch (e: any) {
    res.status(500).json({ message: e.message || e });
  }
};
