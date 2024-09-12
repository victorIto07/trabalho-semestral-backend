import * as crypto from 'crypto';
import { UsersTokensValidation } from './models/accessModel';
import { addWeeks } from 'date-fns';

export const Encrypt = (str: string) => crypto.createHash('sha256').update(str).digest('base64')

export const GetPassword = (password: string) => Encrypt(password);

export const GenerateNewToken = (id: string) => {
  const now = new Date();

  const token = Encrypt(`${id}:${now.toISOString()}`)

  UsersTokensValidation[token] = { user_id: id, valid_untill: addWeeks(now, 1) };
  return token;
}

export const GetUserToken = (id: string) => {
  const now = new Date();

  for (let [token, data] of Object.entries(UsersTokensValidation)) {
    if (data.valid_untill > now)
      return token;
  }

  return GenerateNewToken(id);
}
