import { ChangeEvent, useEffect, useState } from 'react';
import userContacts from '../data/contacts.json';
import ContactForm from './contactForm';
import ContactList from './contactList';
import Filter from './filter';
import css from './App.module.css';

export interface Contacts {
  id: string;
  name: string;
  number: string;
}

const LOCAL_KEY = 'array-users-contacts';
const storedValue = localStorage.getItem(LOCAL_KEY);
const isLocalStorage: Contacts[] | null =
  storedValue !== null ? JSON.parse(storedValue) : null;

export const App = () => {
  const [filter, setFilter] = useState<string>('');
  const [contacts, setContacts] = useState<Contacts[]>(() =>
    isLocalStorage && isLocalStorage.length > 0 ? isLocalStorage : userContacts
  );

  useEffect(() => {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = (newContact: Contacts) => {
    const normalizedName = newContact.name.toLowerCase();

    const isName = contacts.some(
      ({ name }) => name.toLowerCase() === normalizedName
    );

    if (isName) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts([newContact, ...contacts]);
  };

  const filterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const deleteContact = (contactId: string) => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={css.container}>
      <h1>PhoneBook</h1>
      <ContactForm addContacts={addContacts} />
      <h2>My Contacts</h2>
      <Filter value={filter} filterChange={filterChange} />
      <ContactList data={visibleContacts()} deleteContact={deleteContact} />
    </div>
  );
};
