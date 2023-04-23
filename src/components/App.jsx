import { Component } from 'react';
import userContacts from '../data/contacts.json';
import ContactForm from './contactForm';
import ContactList from './contactList';
import Filter from './filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: userContacts,
    filter: '',
  };

  addContacts = data => {
    const nameUser = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );
    if (nameUser) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [data, ...contacts],
    }));
  };

  filterChange = event => {
    this.setState({ filter: event.target.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  visibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm addContacts={this.addContacts} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onfilterChange={this.filterChange} />
        <ContactList
          data={this.visibleContacts()}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
