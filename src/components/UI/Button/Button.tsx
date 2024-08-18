import { FC } from 'react';
import cls from './style.module.scss';

const Button: FC = ({ children, ...props }) => {
  return (
    <button className={cls.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
