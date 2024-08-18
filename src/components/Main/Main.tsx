import cls from './style.module.scss';
import { useAppSelector } from '../../hooks/redux.ts';
import { useEffect, useRef } from 'react';
import { FormData } from '../../types/formData.ts';

const headlines: Record<string, string> = {
  accept: 'Agreed',
  email: 'E-mail',
  password: 'Password',
  confirmPassword: 'Conf. password',
  country: 'Country',
  gender: 'Gender',
  age: 'Age',
  name: 'Name',
};

const renderData = (data: FormData) => {
  return (
    <>
      {Object.entries(data).map(([key, value]) => (
        <div className={key === 'file' ? cls.dataWrapperImage : cls.dataWrapper} key={key}>
          <span className={cls.dataKey}>{key === 'file' ? 'Your file:' : (headlines[key] || key) + ':'}</span>
          {key === 'file' ? (
            value && typeof value === 'string' ? (
              <img src={value} alt="Uploaded file" />
            ) : (
              <div>No file uploaded</div>
            )
          ) : (
            <span className={cls.dataValue}>{value !== null ? String(value) : ''}</span>
          )}
        </div>
      ))}
    </>
  );
};

const Main = () => {
  const submissions = useAppSelector(state => state.form.submissions);
  const endOfListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submissions.length > 0) {
      if (endOfListRef.current) {
        endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [submissions]);

  return (
    <div className={cls.flex}>
      <h1>All Submissions</h1>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <ul className={cls.submissionsList}>
          {submissions.map((submission, index) => {
            const isLastSubmission = index === submissions.length - 1;
            return (
              <li key={index} className={`${cls.submissionsItem} ${isLastSubmission ? cls.highlight : ''}`}>
                {renderData(submission)}
              </li>
            );
          })}
          <div ref={endOfListRef} />
        </ul>
      )}
    </div>
  );
};

export default Main;
