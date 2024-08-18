import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUncontrolledFormData } from '../store/formSlice';
import Input from './UI/Input/Input.tsx';
import Select from './UI/Select/Select.tsx';
import Checkbox from './UI/Checkbox/Checkbox.tsx';
import Button from './UI/Button/Button.tsx';
import Form from './Form/Form.tsx';
import Autocomplete from './UI/Autocomplete/Autocomplete';
import { RootState } from '../store/store.ts';
import { toBase64 } from '../utils/base64.ts';
import { FormErrors } from '../types/formErrors.ts';
import { validateForm } from '../utils/validation/uncontrolledValidation.ts';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../types/formData.ts';

const UncontrolledForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<FormErrors>({});
  const [accept, setAccept] = useState(false);

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

  const handleErrors = (errors: FormErrors) => {
    setErrors(errors);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccept(e.target.checked);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fileInput = refs.file.current;
    const file = fileInput?.files?.[0] || null;

    const dataWithRawFile: FormData = {
      name: refs.name.current?.value || '',
      age: refs.age.current?.value ? +refs.age.current.value : null,
      gender: refs.gender.current?.value || '',
      country: refs.country.current?.value || '',
      email: refs.email.current?.value || '',
      password: refs.password.current?.value || '',
      confirmPassword: refs.confirmPassword.current?.value || '',
      accept: refs.accept.current?.checked || false,
      file: file,
    };

    const isValid = await validateForm(dataWithRawFile, handleErrors);

    if (isValid) {
      let fileBase64: string | null = null;

      if (file) {
        try {
          fileBase64 = await toBase64(file);
        } catch (error) {
          console.error('error converting to base64:', error);
        }
      }

      const data: FormData = {
        ...dataWithRawFile,
        file: fileBase64 || null,
      };

      dispatch(setUncontrolledFormData(data));
      navigate('/', { state: { formData: data } });
    }
  };

  return (
    <Form title="Uncontrolled Form" onSubmit={handleSubmit}>
      <Input id="name" label="Name" ref={refs.name} error={errors.name} />
      <Input id="age" label="Age" type="number" ref={refs.age} error={errors.age} />
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
        error={errors.country}
      />
      <Select
        id="gender"
        label="Gender"
        options={[
          { value: 'other', label: 'Other' },
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        ref={refs.gender}
        error={errors.gender}
      />
      <Input id="email" label="Email" type="email" ref={refs.email} error={errors.email} />
      <Input
        id="password"
        label="Password"
        type="password"
        ref={refs.password}
        autoComplete="on"
        error={errors.password}
      />
      <Input
        id="confirmPassword"
        label="Confirm password"
        type="password"
        ref={refs.confirmPassword}
        autoComplete="on"
        error={errors.confirmPassword}
      />
      <Input id="file" label="Upload" type="file" accept="image/jpeg, image/png" ref={refs.file} error={errors.file} />
      <Checkbox
        id="terms"
        label="I accept the Terms and Conditions"
        checked={accept}
        ref={refs.accept}
        onChange={handleCheckboxChange}
        error={errors.accept}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default UncontrolledForm;
