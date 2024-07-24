import {ChangeEvent, FC} from 'react';
import cls from "./styles.module.css";

interface Props {
    type: string;
    name: string;
    id?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

export const InputCustom: FC<Props> = ({ name, label, ...rest }) => {
    return (
        <>
            <label htmlFor={name} className={cls.label}>{label ? label : ''}</label>
            <input className={cls.input} {...rest}/>
        </>
    );
};

export default InputCustom;