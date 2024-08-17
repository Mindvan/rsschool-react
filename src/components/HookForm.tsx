import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setHookFormData } from '../store/formSlice';
import { FormData } from '../store/formSlice';

const HookForm = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    const { file, ...otherData } = data;
    const metadata = file && file[0] ? { name: file[0].name, size: file[0].size } : null;
    dispatch(setHookFormData({ ...otherData, file: metadata }));
  };

  return (
    <div>
      <h2>React Hook Form:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" {...register('name')} />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" {...register('age')} />
        </div>
        <div>
          <label htmlFor="country">Select your country:</label>
          <select id="country" {...register('country')}>
            <option value="ru">Russia</option>
            <option value="pl">Poland</option>
            <option value="cz">Czechia</option>
          </select>
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" {...register('gender')}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register('email')} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" {...register('password')} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input id="confirmPassword" type="password" {...register('confirmPassword')} />
        </div>
        <div>
          <label htmlFor="fileUpload">Upload Picture:</label>
          <input id="fileUpload" type="file" accept="image/jpeg, image/png" {...register('file')} />
        </div>
        <div>
          <input id="terms" type="checkbox" {...register('accept')} />
          <label htmlFor="terms">I accept the Terms and Conditions</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HookForm;
