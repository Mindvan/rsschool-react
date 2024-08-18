import { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import cls from './style.module.scss';

interface Props {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ id, label, checked = false, onChange, onBlur, error }, ref: ForwardedRef<HTMLInputElement>) => (
    <div className={cls.checkboxWrapper}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} onBlur={onBlur} ref={ref} />
      <label htmlFor={id}>{label}</label>
      {error && <p className={cls.error}>{error}</p>}
    </div>
  )
);

export default Checkbox;
