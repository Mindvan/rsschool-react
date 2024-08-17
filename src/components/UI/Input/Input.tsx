import { ForwardedRef, forwardRef } from 'react';
import cls from './style.module.scss';

interface Props {
  id: string;
  label: string;
  type?: string;
  accept?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, label, type = 'text', ...rest }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={cls.inputWrapper}>
        <label htmlFor={id}>{label}:</label>
        <input className={cls.input} id={id} type={type} ref={ref} {...rest} />
      </div>
    );
  }
);

export default Input;
