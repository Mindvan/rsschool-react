import { Path, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setHookFormData } from '../store/formSlice';
import Input from './UI/Input/Input';
import Autocomplete from './UI/Autocomplete/Autocomplete';
import Checkbox from './UI/Checkbox/Checkbox';
import Button from './UI/Button/Button';
import Form from './Form/Form';
import { FormData } from '../store/formSlice';
import Select from './UI/Select/Select.tsx';
import { ChangeEvent } from 'react';
import { toBase64 } from '../utils/base64.ts';

const HookForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const dispatch = useAppDispatch();

  const countries = useAppSelector(state => state.countries.list);
  const selectedCountry = watch('country');

  const onCountryChange = (value: string) => {
    setValue('country' as Path<FormData>, value || '');
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64String = await toBase64(file);
        setValue('file' as Path<FormData>, base64String);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  };

  const onSubmit = (data: FormData) => {
    dispatch(setHookFormData(data));
  };

  return (
    <Form title="React Hook Form" onSubmit={handleSubmit(onSubmit)}>
      <Input id="name" label="Name" {...register('name' as Path<FormData>)} />
      <Input id="age" label="Age" type="number" {...register('age' as Path<FormData>)} />
      <Autocomplete
        id="country"
        label="Select your country"
        options={countries}
        onChange={onCountryChange}
        value={selectedCountry || ''}
      />
      <Select
        id="gender"
        label="Gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
        {...register('gender' as Path<FormData>)}
      />
      <Input id="email" label="Email" type="email" {...register('email' as Path<FormData>)} />
      <Input
        id="password"
        label="Password"
        type="password"
        autoComplete="on"
        {...register('password' as Path<FormData>)}
      />
      <Input
        id="confirmPassword"
        label="Confirm password"
        autoComplete="on"
        type="password"
        {...register('confirmPassword' as Path<FormData>)}
      />
      <Input id="file" label="Upload" type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
      <Checkbox id="terms" label="I accept the Terms and Conditions" {...register('accept' as Path<FormData>)} />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default HookForm;
