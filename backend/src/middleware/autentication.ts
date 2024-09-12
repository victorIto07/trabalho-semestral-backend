import { Request, Response, NextFunction } from 'express';
import { UsersTokensValidation } from '../models/accessModel';

export const ValidateAuth = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers['authorization'];

  try {
    if (!token) throw new Error('Auth token not provided');

    const auth = UsersTokensValidation[token];
    if (!auth) throw new Error('Invalid token');

    const now = new Date();

    if (now > auth.valid_untill) {
      delete UsersTokensValidation[token];
      throw new Error('Expired token');
    }

    req.body.user_id = auth.user_id;

    next();
  } catch (error: any) {
    res.status(403).json({ message: `Action forbidden: ${error.message}` });
  }

}
