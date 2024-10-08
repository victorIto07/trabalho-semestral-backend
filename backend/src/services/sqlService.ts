import { ConnectionOptions, createConnection, FieldPacket } from "mysql2/promise";


const newConnection = async () => {
  const opts: ConnectionOptions = {
    host: process.env.__DB_URL__,
    port: parseInt(process.env.__DB_PORT__ || '3306'),
    user: process.env.__DB_USER__,
    password: process.env.__DB_PASSWORD__,
    database: process.env.__DB_DATABASE__
  };

  return await createConnection(opts);
}

export const testConnection = async () => {
  const c = await newConnection();

  try {
    await c.connect();
    console.log('Connection with the database succeeded.');
  } catch (error) {
    console.log('Error to close connection with the database.');
  }
}

export const newQuery = async<T>(query: string, args?: any[]): Promise<T[]> => {
  const c = await newConnection();

  return (await c.query(query, args) as [T[], FieldPacket[]])[0];
}
