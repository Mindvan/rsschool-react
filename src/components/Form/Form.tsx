import { ButtonHTMLAttributes, FC } from 'react';
import cls from './style.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLFormElement> {
  title: string;
}

export const Form: FC<Props> = ({ title, children, ...props }) => {
  return (
    <div className={cls.formWrapper}>
      <h2>{title}</h2>
      <form className={cls.form} {...props}>
        {children}
      </form>
    </div>
  );
};

export default Form;
