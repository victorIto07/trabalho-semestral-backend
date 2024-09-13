import { Request, Response, NextFunction } from 'express';
import { UsersTokensValidation } from '../models/accessModel';

export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  try {
    if (!token) throw new Error('Auth token not provided');

    const auth = UsersTokensValidation[token];
    if (!auth) throw new Error('Invalid token');

    const now = new Date();

    if (now > auth.validUntill) {
      delete UsersTokensValidation[token];
      throw new Error('Expired token');
    }

    req.body.userId = auth.userId;

    next();
  } catch (error: any) {
    res.status(403).json({ message: `Action forbidden: ${error.message}` });
  }

}
