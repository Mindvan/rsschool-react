import { ForwardedRef, forwardRef } from 'react';
import cls from './style.module.scss';

interface Props {
  id: string;
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(({ id, label }, ref: ForwardedRef<HTMLInputElement>) => (
  <div className={cls.checkboxWrapper}>
    <input id={id} type="checkbox" ref={ref} />
    <label htmlFor={id}>{label}</label>
  </div>
));

export default Checkbox;
