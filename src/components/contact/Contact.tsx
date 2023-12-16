import { FC } from 'react';
import { Contacts } from '../App';
import css from './Contact.module.css';

interface ContactProps {
  contact: Contacts;
  deleteContact: (contactId: string) => void;
}

const Contact: FC<ContactProps> = ({ contact, deleteContact }) => {
  return (
    <li key={contact.id} className={css.item}>
      <span className={css.name}>{contact.name}:</span>
      <span className={css.number}> {contact.number}</span>
      <button
        className={css.button}
        type="button"
        onClick={() => {
          deleteContact(contact.id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
