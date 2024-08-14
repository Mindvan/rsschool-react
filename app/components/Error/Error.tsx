import cls from './styles.module.css';

export const Error = () => {
    return (
        <div className={cls.error__message}>
            Error 404. Try again.
        </div>
    );
};

export default Error;
