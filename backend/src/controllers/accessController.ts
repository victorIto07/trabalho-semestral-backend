import { Request, Response } from 'express';
import { GenerateNewToken, GetPassword } from '../util';
import { User } from '../models/accessModel';
import { v4 } from 'uuid';
import { NewQuery } from '../services/sqlService';
import { LoginQuery, LogonQuery } from '../models/sqlQueries';


export const Login = async (req: Request, res: Response) => {
  const email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    res.status(422).json({ message: 'Invalid payload' });
    return
  }

  password = GetPassword(password);

  const [[user]] = await NewQuery<User>(LoginQuery, [email, password]) as [User[], any];
  if (!user?.id) {
    res.status(400).json({ message: 'User not found' });
    return
  }

  const token = GenerateNewToken(user.id);

  const res_data = { name: user.name, email: user.email, token };
  res.status(200).json(res_data);
}

export const Logon = async (req: Request, res: Response) => {
  if (!req.body.password || !req.body.name || !req.body.email) {
    res.status(422).json({ message: 'Invalid payload' });
    return;
  }

  try {
    const password = GetPassword(req.body.password);

    const newUser: User = {
      id: v4(),
      name: req.body.name,
      email: req.body.email,
      password_hash: password,
    }

    await NewQuery(LogonQuery, [newUser.id, newUser.name, newUser.email, newUser.password_hash]);

    const token = GenerateNewToken(newUser.id);

    const res_data = { name: newUser.name, email: newUser.email, token };
    res.status(201).json(res_data);
  }
  catch (error: any) {
    res.status(500).json({ message: error.message || error });
  }
}
