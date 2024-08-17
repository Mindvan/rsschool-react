import { useForm } from 'react-hook-form';
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

const HookForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const dispatch = useAppDispatch();

  const countries = useAppSelector(state => state.countries.list);
  const selectedCountry = watch('country');

  const onCountryChange = (value: string) => {
    setValue('country', value || '');
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('please select a PNG or JPEG image.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('image size exceeds 5mb');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setValue('file', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('Selected Country on Submit:', data.country);
    console.log('Form Data:', data);
    dispatch(setHookFormData(data));
  };

  return (
    <Form title="React Hook Form" onSubmit={handleSubmit(onSubmit)}>
      <Input id="name" label="Name" {...register('name')} />
      <Input id="age" label="Age" type="number" {...register('age')} />
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
        {...register('gender')}
      />
      <Input id="email" label="Email" type="email" {...register('email')} />
      <Input id="password" label="Password" type="password" autoComplete="on" {...register('password')} />
      <Input
        id="confirmPassword"
        label="Confirm password"
        autoComplete="on"
        type="password"
        {...register('confirmPassword')}
      />
      <Input id="file" label="Upload" type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
      <Checkbox id="terms" label="I accept the Terms and Conditions" {...register('accept')} />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default HookForm;
