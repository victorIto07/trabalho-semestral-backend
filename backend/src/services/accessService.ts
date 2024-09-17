import { User } from "../models/accessModel";
import { LoginQuery, LogonQuery, UserExistsQuery } from "../models/sqlQueries";
import { getPassword, newUUID } from "../util";
import { newQuery } from "./sqlService";

export const userExists = async (email: string): Promise<boolean> => {
  const [user] = await newQuery<User>(UserExistsQuery, [email]);
  return !!(user?.id);
}

export const getUserByLogin = async ({ email, password }: { email: string, password: string }) => {
  const password_hash = getPassword(password);

  const [user] = await newQuery<User>(LoginQuery, [email, password_hash]);
  if (!user?.id) {
    throw new Error('User not found.');
  }

  return user;
}

export const createUser = async ({ name, email, password }: { name: string, email: string, password: string }) => {
  const password_hash = getPassword(password);
  const newUser: User = {
    id: newUUID(),
    name,
    email,
    password_hash,
  };

  await newQuery(LogonQuery, [newUser.id, newUser.name, newUser.email, newUser.password_hash]);

  return newUser;
}
