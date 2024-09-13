import { Request, Response } from 'express';
import { generateNewToken, getPassword, getUserToken } from '../util';
import { User } from '../models/accessModel';
import { v4 } from 'uuid';
import { newQuery } from '../services/sqlService';
import { LoginQuery, LogonQuery } from '../models/sqlQueries';


export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    res.status(422).json({ message: 'Invalid payload' });
    return
  }

  password = getPassword(password);

  const [[user]] = await newQuery<User>(LoginQuery, [email, password]) as [User[], any];
  if (!user?.id) {
    res.status(400).json({ message: 'User not found' });
    return
  }

  const token = getUserToken(user.id);

  const res_data = { name: user.name, email: user.email, token };
  res.status(200).json(res_data);
}

export const logon = async (req: Request, res: Response) => {
  if (!req.body.password || !req.body.name || !req.body.email) {
    res.status(422).json({ message: 'Invalid payload' });
    return;
  }

  try {
    const password = getPassword(req.body.password);

    const newUser: User = {
      id: v4(),
      name: req.body.name,
      email: req.body.email,
      password_hash: password,
    }

    await newQuery(LogonQuery, [newUser.id, newUser.name, newUser.email, newUser.password_hash]);

    const token = generateNewToken(newUser.id);

    const res_data = { name: newUser.name, email: newUser.email, token };
    res.status(201).json(res_data);
  }
  catch (error: any) {
    res.status(500).json({ message: error.message || error });
  }
}
