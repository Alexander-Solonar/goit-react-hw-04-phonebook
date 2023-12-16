import css from './ContactList.module.css';
import Contact from '../contact';
import { Contacts } from '../App';
import { FC } from 'react';

interface ContactListProps {
  data: Contacts[];
  deleteContact: (contactId: string) => void;
}

const ContactList: FC<ContactListProps> = ({ data, deleteContact }) => {
  return (
    <ul className={css.list}>
      {data.map(item => (
        <Contact key={item.id} contact={item} deleteContact={deleteContact} />
      ))}
    </ul>
  );
};

export default ContactList;
