import { Request, Response } from 'express';
import { generateNewToken, getUserToken, validateKeys } from '../util';
import { createUser, getUserByLogin, userExists } from '../services/accessService';


export const login = async (req: Request, res: Response) => {
  if (!validateKeys(req.body, 'email', 'password')) {
    res.status(422).json({ message: 'Invalid payload' });
    return;
  }

  try {
    const user = await getUserByLogin(req.body);
    const token = getUserToken(user.id);

    res.status(200).json({ name: user.name, email: user.email, token, id: user.id });
  } catch (e: any) {
    res.status(500).json({ message: e.message || e });
  }
}

export const logon = async (req: Request, res: Response) => {
  if (!validateKeys(req.body, 'password', 'name', 'email')) {
    res.status(422).json({ message: 'Invalid payload' });
    return;
  }

  if (await userExists(req.body.email)) {
    res.status(400).json({ message: 'Email already in use.' });
    return;
  }

  try {
    const newUser = await createUser(req.body);
    const token = generateNewToken(newUser.id);

    res.status(201).json({ name: newUser.name, email: newUser.email, token, id: newUser.id });
  }
  catch (e: any) {
    res.status(500).json({ message: e.message || e });
  }
}
