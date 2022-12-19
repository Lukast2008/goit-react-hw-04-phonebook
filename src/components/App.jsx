import { useState, useEffect } from 'react';
import { Phonebook } from './Phonebook/Phonebook';
import { ContactList } from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import { FilterContacts } from './Filter/Filter';
import styles from './Phonebook/styles.module.css';

export const App = () => {
  const [ contacts, setContacts ] = useState([ ]);
  const [ filterContact, setFilterContact]  = useState('');
  const phoneList = 'phoneList';



  useEffect(() => {
    const stContact = JSON.parse(localStorage.getItem(phoneList));
    if (stContact) {
      setContacts( stContact);
    }
  }, []);

  useEffect(() => {
     localStorage.setItem(phoneList, JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = id => {
    setContacts(contacts.filter(contacts => contacts.id !== id));
  };

  const filterContacts = () => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filterContact.toLowerCase())
    );
  };

  const handleSubmit = ( name, number ) => {
    if (contacts.find(el => el.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts([...contacts, { id: nanoid(), name, number }]);
    }
  };

  const onChange = ev => {
    setFilterContact( ev.target.value );
  };

  return (
    <div className={styles.container}>
      <Phonebook addContact={handleSubmit} />
      <h2 className={styles.title}>Contacts</h2>
      <FilterContacts filter={filterContact} onChange={onChange} />
      <ContactList contact={filterContacts()} contactDelete={deleteContact} />
    </div>
  );
};
