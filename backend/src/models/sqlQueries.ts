/* AUTH */
export const LogonQuery = `insert into users(id, name, email, password_hash) values(?,?,?,?)`;
export const LoginQuery = `select * from users where email = ? and password_hash = ?`;

/* CONTACT */
export const GetContactsQuery = `select * from contacts;`;
export const GetContactQuery = `select * from contacts where id = ?`;
export const CreateContactQuery = `insert into contacts(id, name, phone_number, email, image_url, user_created_by) values(?,?,?,?,?,?)`;
export const UpdateContactQuery = `update contacts set name = ?, phone_number = ?, email = ?, image_url = ? where id = ?`;
export const DeleteContactQuery = `delete from contacts where id = ?`;
