import React, {FC} from 'react';
import { MouseEvent } from 'react';
import cls from './styles.module.css';

interface Props {
    children: React.ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: string;
}

const ButtonCustom: FC<Props> = ({ children, type, ...rest }) => {
    return (
        <button className={type? `${cls.button} ${type}` : cls.button} {...rest}>
            {children}
        </button>
    );
};

export default ButtonCustom;