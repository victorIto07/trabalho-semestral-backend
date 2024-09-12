import { Request, Response } from 'express';
import { NewQuery } from '../services/sqlService';

export const getContacts = async (req: Request, res: Response) => {
  const [contacts, __] = await NewQuery(`select * from contacts;`);
  console.log(contacts);
  res.json(contacts);
};

export const getContact = async (_: Request, res: Response) => {
};

export const createContact = async (_: Request, res: Response) => {
};

export const updateContact = async (_: Request, res: Response) => {
};

export const deleteContact = async (_: Request, res: Response) => {
};
