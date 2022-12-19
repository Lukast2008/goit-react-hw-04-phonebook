import { useState } from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const Phonebook = ({ addContact }) => {
  const [nameContact, setNameContact] = useState('');
  const [number, setNumber] = useState('');

  const inputName = [
    {
      name: 'name',
      pattern: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
      title:
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
    },
    {
      name: 'number',
      pattern:
        '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
      title:
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
    },
  ];


  const onChange = ev => {
    const { name, value } = ev.target;
    switch (name) {
      case 'name':
        setNameContact(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    addContact(nameContact, number);

    reset();
  };

  const reset = () => {
    setNameContact('');
    setNumber('');
  };

  return (
    <div className={styles.formstyle}>
      <h1 className={styles.title}>Phonebook</h1>
      <form className={styles.bodyform} onSubmit={handleSubmit}>
        {inputName.map(({ name, pattern, title }, index) => (
          <label className={styles.label} key={name}>
            <input
              className={styles.inputItem}
              type="text"
              name={name}
              placeholder={name}
              value={!index ? nameContact : number}
              onChange={onChange}
              pattern={pattern}
              title={title}
              required
            ></input>
          </label>
        ))}
        <button className={styles.buttonstles} type="submit">
          Add Contact
        </button>
      </form>
    </div>
  );
};

Phonebook.propTypes = {
  addContact: PropTypes.func.isRequired,
};
