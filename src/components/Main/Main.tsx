import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import cls from './style.module.scss';

const Main = () => {
  const uncontrolledFormData = useSelector((state: RootState) => state.form.uncontrolledFormData);
  const hookFormData = useSelector((state: RootState) => state.form.hookFormData);

  return (
    <div className={cls.flex}>
      <h2>Uncontrolled:</h2>
      <pre>{JSON.stringify(uncontrolledFormData, null, 2)}</pre>

      <h2>React Hook Form:</h2>
      <pre>{JSON.stringify(hookFormData, null, 2)}</pre>
    </div>
  );
};

export default Main;
