import styles from '../Phonebook/styles.module.css';
import PropTypes from 'prop-types';

export const FilterContacts = ({ filter, onChange }) => {
  return (
    <form className={styles.bodyform}>
      <label className={styles.label}>
        <input
          className={styles.inputItemFind}
          type="text"
          name="filter"
          value={filter}
          onChange={onChange}
          placeholder={'find contact by name'}
        />
      </label>
    </form>
  );
};

FilterContacts.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
