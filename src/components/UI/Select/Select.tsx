import { ForwardedRef, forwardRef } from 'react';
import cls from './style.module.scss';

interface Props {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ id, label, options }, ref: ForwardedRef<HTMLSelectElement>) => (
    <div className={cls.selectWrapper}>
      <label htmlFor={id}>{label}:</label>
      <select className={cls.select} id={id} ref={ref}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
);

export default Select;
