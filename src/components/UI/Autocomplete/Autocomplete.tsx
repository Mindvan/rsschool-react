import { useState, ChangeEvent, MouseEvent, ForwardedRef, forwardRef } from 'react';
import cls from './style.module.scss';
import Input from '../Input/Input.tsx';

interface Props {
  id: string;
  label: string;
  options: string[];
  onChange: (selectedOption: string | null) => void;
  value: string | null;
  error?: string;
}

const Autocomplete = forwardRef<HTMLInputElement, Props>(
  ({ id, label, options, onChange, value, error }, ref: ForwardedRef<HTMLInputElement>) => {
    const [query, setQuery] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const filterOptions = (query: string) => {
      return options.filter(option => option.toLowerCase().includes(query.toLowerCase()));
    };

    const handleOptionClick = (option: string) => (e: MouseEvent) => {
      e.preventDefault();
      setQuery(option);
      onChange(option);
      setShowOptions(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setQuery(newValue);
      onChange(newValue);
      setFilteredOptions(filterOptions(newValue));
      setShowOptions(true);
    };

    const handleBlur = () => {
      setTimeout(() => setShowOptions(false), 200);
    };

    const handleFocus = () => {
      setFilteredOptions(filterOptions(query));
      setShowOptions(true);
    };

    return (
      <div className={cls.autocompleteWrapper}>
        <Input
          id={id}
          label={label}
          value={value || query}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          ref={ref}
          error={error}
        />
        {showOptions && filteredOptions.length > 0 && (
          <ul className={cls.autocompleteList}>
            {filteredOptions.map(option => (
              <li key={option} onMouseDown={handleOptionClick(option)} className={cls.autocompleteItem}>
                {option}
              </li>
            ))}
          </ul>
        )}
        {showOptions && filteredOptions.length === 0 && (
          <ul className={cls.autocompleteList}>
            <li className={cls.autocompleteItemNotFound}>No options available</li>
          </ul>
        )}
      </div>
    );
  }
);

export default Autocomplete;
