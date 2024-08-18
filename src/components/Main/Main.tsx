import { RootState } from '../../store/store.ts';
import cls from './style.module.scss';
import { useAppSelector } from '../../hooks/redux.ts';

interface FormData {
  [key: string]: string | number | null | File | undefined;
}

const headlines: Record<string, string> = {
  accept: 'Agreed with the rules:',
  email: 'E-mail:',
  password: 'Your password:',
  confirmPassword: 'Your confirmed password:',
  country: 'Your country',
  gender: 'Your gender',
  age: 'Your age',
  name: 'Your name',
};

const renderData = (data: FormData) => {
  const nonFileEntries = Object.entries(data).filter(([key]) => key !== 'file');
  const fileEntries = Object.entries(data).filter(([key]) => key === 'file');

  return (
    <>
      {nonFileEntries.map(([key, value]) => (
        <div className={cls.dataWrapper} key={key}>
          <span className={cls.dataKey}>{headlines[key] || key}:</span>
          <span className={cls.dataValue}>{value !== null ? String(value) : ''}</span>
        </div>
      ))}
      {fileEntries.map(([key, value]) => (
        <div className={cls.dataWrapperImage} key={key}>
          <span className={cls.dataKey}>Your file:</span>
          <img src={`${value}`} alt={key} />
        </div>
      ))}
    </>
  );
};

const Main = () => {
  const uncontrolledFormData = useAppSelector((state: RootState) => state.form.uncontrolledFormData);
  const hookFormData = useAppSelector((state: RootState) => state.form.hookFormData);
  const submittedForm = useAppSelector((state: RootState) => state.form.submittedForm);

  console.log(submittedForm);

  const hasData = (data: FormData) =>
    Object.values(data).some(value => value !== '' && value !== null && value !== false);

  return (
    <div className={cls.flex}>
      <div
        className={
          submittedForm === 'uncontrolled' ? `${cls.flexItemLeft} ${cls.animateHighlight}` : `${cls.flexItemLeft}`
        }
      >
        <h2>Uncontrolled</h2>
        {hasData(uncontrolledFormData) ? renderData(uncontrolledFormData) : <div>Данных нет</div>}
      </div>
      <div
        className={submittedForm === 'hook' ? `${cls.flexItemRight} ${cls.animateHighlight}` : `${cls.flexItemRight}`}
      >
        <h2>React Hook Form</h2>
        {hasData(hookFormData) ? renderData(hookFormData) : <div>Данных нет</div>}
      </div>
    </div>
  );
};

export default Main;
