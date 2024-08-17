import { ButtonHTMLAttributes, FC } from 'react';
import Icon from '../Icon/Icon.tsx';
import cls from './style.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: boolean;
}

const Button: FC<Props> = ({ icon, children, ...props }) => {
  return (
    <button className={cls.button} {...props}>
      {children} {icon && <Icon />}
    </button>
  );
};

export default Button;
