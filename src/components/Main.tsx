import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Main = () => {
  const uncontrolledFormData = useSelector((state: RootState) => state.form.uncontrolledFormData);
  const hookFormData = useSelector((state: RootState) => state.form.hookFormData);

  return (
    <div>
      <h1>Main Page</h1>
      <h2>Uncontrolled Form Data:</h2>
      <pre>{JSON.stringify(uncontrolledFormData, null, 2)}</pre>

      <h2>React Hook Form Data:</h2>
      <pre>{JSON.stringify(hookFormData, null, 2)}</pre>
    </div>
  );
};

export default Main;
