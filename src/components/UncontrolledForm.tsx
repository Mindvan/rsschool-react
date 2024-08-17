import { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUncontrolledFormData } from '../store/formSlice';
import { FormData } from '../store/formSlice';

const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const refs = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLSelectElement>(null),
    country: useRef<HTMLSelectElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
    accept: useRef<HTMLInputElement>(null),
    file: useRef<HTMLInputElement>(null),
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data: FormData = {
      name: refs.name.current?.value || '',
      age: refs.age.current?.value ? +refs.age.current.value : null,
      gender: refs.gender.current?.value || '',
      country: refs.country.current?.value || '',
      email: refs.email.current?.value || '',
      password: refs.password.current?.value || '',
      confirmPassword: refs.confirmPassword.current?.value || '',
      accept: refs.accept.current?.checked || false,
      file: {
        name: refs.file.current?.files?.[0].name,
        size: refs.file.current?.files?.[0].size
      } || null,
    };

    dispatch(setUncontrolledFormData(data));
  };

  return (
    <div>
      <h2>Uncontrolled Form:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" ref={refs.name} />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" ref={refs.age} />
        </div>
        <div>
          <label htmlFor="country">Select your country:</label>
          <select id="country" ref={refs.country}>
            <option value="ru">Russia</option>
            <option value="pl">Poland</option>
            <option value="cz">Czechia</option>
          </select>
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" ref={refs.gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" ref={refs.email} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" ref={refs.password} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input id="confirmPassword" type="password" ref={refs.confirmPassword} />
        </div>
        <div>
          <label htmlFor="fileUpload">Upload Picture:</label>
          <input id="fileUpload" type="file" accept="image/jpeg, image/png" ref={refs.file} />
        </div>
        <div>
          <input id="terms" type="checkbox" ref={refs.accept} />
          <label htmlFor="terms">I accept the Terms and Conditions</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
