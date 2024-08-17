import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setHookFormData } from '../store/formSlice';
import { FormData } from '../store/formSlice';
import Input from './UI/Input/Input.tsx';
import Select from './UI/Select/Select.tsx';
import Checkbox from './UI/Checkbox/Checkbox.tsx';
import Button from './UI/Button/Button.tsx';
import Form from './Form/Form.tsx';

const HookForm = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    if (!data.file) {
      dispatch(setHookFormData(data));
    } else {
      const metadata = data.file?.[0]
        ? {
            name: data.file[0].name,
            size: data.file[0].size,
          }
        : null;

      dispatch(setHookFormData({ ...data, file: metadata }));
    }
  };

  return (
    <Form title="React Hook Form" onSubmit={handleSubmit(onSubmit)}>
      <Input id="name" label="Name" {...register('name')} />
      <Input id="age" label="Age" type="number" {...register('age')} />
      <Select
        id="country"
        label="Select your country"
        options={[
          { value: 'ru', label: 'Russia' },
          { value: 'pl', label: 'Poland' },
          { value: 'cz', label: 'Czechia' },
        ]}
        {...register('country')}
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
      <Input id="password" label="Password" type="password" {...register('password')} />
      <Input id="confirmPassword" label="Confirm password" type="password" {...register('confirmPassword')} />
      <Input id="file" label="Upload" type="file" accept="image/jpeg, image/png" {...register('file')} />
      <Checkbox id="terms" label="I accept the Terms and Conditions" {...register('accept')} />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default HookForm;
