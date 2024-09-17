import { Contact } from "../models/contactModel";
import { CreateContactQuery, DeleteContactQuery, GetContactQuery, GetContactsQuery, UpdateContactQuery } from "../models/sqlQueries";
import { newUUID, userCanEditContact } from "../util";
import { newQuery } from "./sqlService";

export const getContacts = async (userId: string) => {
  const contacts = await newQuery<Contact>(GetContactsQuery, [userId]);

  return contacts;
}

export const getContact = async (contactId: string) => {
  const [contact] = await newQuery<Contact>(GetContactQuery, [contactId]);

  if (!contact?.id)
    throw new Error('Contact not found.')

  return contact;
}

export const createContact = async ({ name, email, phone_number, image_url, userId }: { name: string, email: string, phone_number: string, image_url: string, userId: string }) => {
  const newContact: Contact = {
    id: newUUID(),
    name: name,
    phone_number: phone_number,
    email: email,
    image_url: image_url,
    user_created_by: userId
  };

  await newQuery(CreateContactQuery, [newContact.id, newContact.name, newContact.phone_number, newContact.email, newContact.image_url, newContact.user_created_by]);

  return newContact;
}

export const updateContact = async ({ id, name, phone_number, email, image_url }: { id: string, name: string, email: string, phone_number: string, image_url: string, userId: string }) => {
  await newQuery(UpdateContactQuery, [name, phone_number, email, image_url, id]);
}

export const deleteContact = async (contactId: string) => {
  await newQuery(DeleteContactQuery, [contactId]);
}
