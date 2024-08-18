import { RootState } from '../../store/store.ts';
import cls from './style.module.scss';
import { useAppSelector } from '../../hooks/redux.ts';

const Main = () => {
  const uncontrolledFormData = useAppSelector((state: RootState) => state.form.uncontrolledFormData);
  const hookFormData = useAppSelector((state: RootState) => state.form.hookFormData);

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
