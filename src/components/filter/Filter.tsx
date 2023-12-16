import { ChangeEvent, FC } from 'react';
import css from './Filter.module.css';

interface FilterProps {
  value: string;
  filterChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Filter: FC<FilterProps> = ({ value, filterChange }) => {
  return (
    <label className={css.label}>
      <span>Find contacts by name</span>

      <input
        className={css.input}
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="filter"
        required
        value={value}
        onChange={filterChange}
      />
    </label>
  );
};

export default Filter;
