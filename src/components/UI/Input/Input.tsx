import { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import cls from './style.module.scss';

interface Props {
  id: string;
  label: string;
  type?: string;
  accept?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, label, type = 'text', onChange, error, ...rest }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={cls.inputWrapper}>
        <label htmlFor={id}>{label}:</label>
        <input className={cls.input} id={id} type={type} ref={ref} onChange={onChange} {...rest} />
        {error && <p className={cls.error}>{error}</p>}
      </div>
    );
  }
);

export default Input;
