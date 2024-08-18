import { Controller, Path, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setHookFormData, setSubmittedForm } from '../store/formSlice';
import Input from './UI/Input/Input';
import Autocomplete from './UI/Autocomplete/Autocomplete';
import Checkbox from './UI/Checkbox/Checkbox';
import Button from './UI/Button/Button';
import Form from './Form/Form';
import Select from './UI/Select/Select.tsx';
import { toBase64 } from '../utils/base64.ts';
import { schema } from '../utils/validation/schema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../types/formData.ts';

const HookForm = () => {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();

  const countries = useAppSelector(state => state.countries.list);

  const onSubmit = async (data: FormData) => {
    let d = { ...data };

    if (d.file && typeof d.file !== 'string') {
      try {
        const base64String = await toBase64(d.file);
        d = { ...d, file: base64String };
      } catch (error) {
        console.error('error converting to base64:', error.message);
        return;
      }
    }

    dispatch(setHookFormData(d));
    dispatch(setSubmittedForm('hook'));
    navigate('/', { state: { formData: d } });
  };

  return (
    <Form title="React Hook Form" onSubmit={handleSubmit(onSubmit)}>
      <Input id="name" label="Name" {...register('name' as Path<FormData>)} error={errors.name?.message} />
      <Input id="age" label="Age" type="number" {...register('age' as Path<FormData>)} error={errors.age?.message} />
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <Autocomplete
            id="country"
            label="Select your country"
            options={countries}
            onChange={value => field.onChange(value)}
            value={field.value || ''}
            error={errors.country?.message}
          />
        )}
      />
      <Select
        id="gender"
        label="Gender"
        options={[
          { value: 'other', label: 'Other' },
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        {...register('gender' as Path<FormData>)}
        error={errors.gender?.message}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        {...register('email' as Path<FormData>)}
        error={errors.email?.message}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        autoComplete="on"
        {...register('password' as Path<FormData>)}
        error={errors.password?.message}
      />
      <Input
        id="confirmPassword"
        label="Confirm password"
        autoComplete="on"
        type="password"
        {...register('confirmPassword' as Path<FormData>)}
        error={errors.confirmPassword?.message}
      />
      <Controller
        name="file"
        control={control}
        render={({ field: { onChange, onBlur, ref } }) => (
          <Input
            id="file"
            label="Upload"
            type="file"
            accept="image/jpeg, image/png"
            onChange={e => {
              if (e.target.files?.[0]) {
                onChange(e.target.files?.[0]);
              }
            }}
            onBlur={onBlur}
            ref={ref}
            error={errors.file?.message}
          />
        )}
      />
      <Controller
        name="accept"
        control={control}
        defaultValue={false}
        render={({ field: { onChange, onBlur, value } }) => (
          <Checkbox
            id="terms"
            label="I accept the Terms and Conditions"
            checked={value}
            onChange={e => onChange(e.target.checked)}
            onBlur={onBlur}
            error={errors.accept?.message}
          />
        )}
      />
      <Button type="submit" disabled={isSubmitting || !isValid}>
        Submit
      </Button>
    </Form>
  );
};

export default HookForm;
