import { Request, Response, NextFunction } from 'express';

export const setupHeader = (req: Request, _res: Response, next: NextFunction) => {
  req.headers['content-type'] = 'application/json';
  next();
}
