import * as crypto from 'crypto';
import { UsersTokensValidation } from './models/accessModel';
import { addWeeks } from 'date-fns';
import { newQuery } from './services/sqlService';
import { GetContactQuery } from './models/sqlQueries';
import { Contact } from './models/contactModel';

export const encrypt = (str: string) => crypto.createHash('sha256').update(str).digest('base64')

export const getPassword = (password: string) => encrypt(password);

export const generateNewToken = (id: string) => {
  const now = new Date();

  const token = encrypt(`${id}:${now.toISOString()}`)

  UsersTokensValidation[token] = { userId: id, validUntill: addWeeks(now, 1) };
  return token;
}

export const getUserToken = (id: string) => {
  const now = new Date();

  for (let [token, data] of Object.entries(UsersTokensValidation)) {
    if (data.userId == id && data.validUntill > now)
      return token;
  }

  return generateNewToken(id);
}

export const validateKeys = (obj: any, ...keys: string[]) => {
  for (const key of keys) {
    if (!obj[key]) {
      return false;
    }
  }
  return true;
}

export const userCanEditContact = async (userId: string, contact_id: string, contact?: Contact) => {
  if (!contact)
    [[contact]] = await newQuery<Contact>(GetContactQuery, [contact_id]);

  if (!contact?.id) return false;

  return contact.user_created_by == userId;
}
