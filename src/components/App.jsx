import { Component } from 'react';
import { Phonebook } from './Phonebook/Phonebook';
import { ContactList } from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import { FilterContacts } from './Filter/Filter';
import styles from './Phonebook/styles.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    hasError: false,
    phoneList: 'phoneList',
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  componentDidMount() {
    if (localStorage.length) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem(this.state.phoneList)),
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.contact !== this.state.contacts) {
      localStorage.setItem(
        this.state.phoneList,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contacts => contacts.id !== id),
    }));
  };

  filterContacts = () => {
    return this.state.contacts.filter(el => {
      return el.name.toLowerCase().includes(this.state.filter.toLowerCase());
    });
  };

  handleSubmit = ({ name, number }) => {
    if (this.state.contacts.find(el => el.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { id: nanoid(), name, number }],
      }));
    }
  };

  onChange = ev => {
    this.setState({ filter: ev.target.value });
  };

  render() {
    return (
      <div className={styles.container}>
        <Phonebook
          contacts={this.contacts}
          stateItems={this.state}
          addContact={this.handleSubmit}
        />
        <h2 className={styles.title}>Contacts</h2>
        <FilterContacts filter={this.state.filter} onChange={this.onChange} />
        <ContactList
          contact={this.filterContacts()}
          contactDelete={this.deleteContact}
        />
      </div>
    );
  }
}
