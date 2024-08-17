import { FormEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUncontrolledFormData } from '../store/formSlice';
import { FormData } from '../store/formSlice';
import Input from './UI/Input/Input.tsx';
import Select from './UI/Select/Select.tsx';
import Checkbox from './UI/Checkbox/Checkbox.tsx';
import Button from './UI/Button/Button.tsx';
import Form from './Form/Form.tsx';
import Autocomplete from './UI/Autocomplete/Autocomplete';
import { RootState } from '../store';

const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const refs = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLSelectElement>(null),
    country: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
    accept: useRef<HTMLInputElement>(null),
    file: useRef<HTMLInputElement>(null),
  };

  const countries = useSelector((state: RootState) => state.countries.list);

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
      file: refs.file.current?.files?.[0]
        ? {
            name: refs.file.current?.files[0].name,
            size: refs.file.current?.files[0].size,
          }
        : null,
    };

    dispatch(setUncontrolledFormData(data));
  };

  return (
    <Form title="Uncontrolled Form" onSubmit={handleSubmit}>
      <Input id="name" label="Name" ref={refs.name} />
      <Input id="age" label="Age" type="number" ref={refs.age} />
      <Autocomplete
        id="country"
        label="Select your country"
        options={countries}
        onChange={value => {
          if (refs.country.current) {
            refs.country.current.value = value || '';
          }
        }}
        value={refs.country.current?.value || ''}
        ref={refs.country}
      />
      <Select
        id="gender"
        label="Gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
        ref={refs.gender}
      />
      <Input id="email" label="Email" type="email" ref={refs.email} />
      <Input id="password" label="Password" type="password" ref={refs.password} autoComplete="on" />
      <Input
        id="confirmPassword"
        label="Confirm password"
        type="password"
        ref={refs.confirmPassword}
        autoComplete="on"
      />
      <Input id="file" label="Upload" type="file" accept="image/jpeg, image/png" ref={refs.file} />
      <Checkbox id="terms" label="I accept the Terms and Conditions" ref={refs.accept} />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default UncontrolledForm;
