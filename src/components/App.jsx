import { useEffect, useState } from 'react';
import userContacts from '../data/contacts.json';
import ContactForm from './contactForm';
import ContactList from './contactList';
import Filter from './filter';
import css from './App.module.css';

const LOCAL_KEY = 'array-users-contacts';
const isLocalStorage = JSON.parse(localStorage.getItem(LOCAL_KEY));

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return isLocalStorage && isLocalStorage.length > 0
      ? isLocalStorage
      : userContacts;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = newContact => {
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

  const filterChange = event => {
    setFilter(event.target.value);
  };

  const deleteContact = contactId => {
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
      <h1>Phonebook</h1>
      <ContactForm addContacts={addContacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onfilterChange={filterChange} />
      <ContactList data={visibleContacts()} onDeleteContact={deleteContact} />
    </div>
  );
};
