import { ForwardedRef, forwardRef } from 'react';
import cls from './style.module.scss';

interface Props {
  id: string;
  label: string;
  type?: string;
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, label, type = 'text', onChange, ...rest }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={cls.inputWrapper}>
        <label htmlFor={id}>{label}:</label>
        <input className={cls.input} id={id} type={type} ref={ref} onChange={onChange} {...rest} />
      </div>
    );
  }
);

export default Input;
