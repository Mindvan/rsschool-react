import * as yup from 'yup';
import { FormErrors } from '../../types/formErrors.ts';
import { FormData } from '../../store/formSlice';

const uncontrolledFormSchema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  age: yup
    .number()
    .nullable()
    .required('Age is required.')
    .positive('Age must be a positive number.')
    .integer('Age must be an integer.'),
  gender: yup.string().required('Gender is required.'),
  country: yup.string().required('Country is required.'),
  email: yup.string().email('Invalid email format.').required('Email is required.'),
  password: yup.string().required('Password is required.').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  accept: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  file: yup.string().nullable(),
});

export const validateForm = async (data: FormData, handleErrors: (errors: FormErrors) => void) => {
  try {
    await uncontrolledFormSchema.validate(data, { abortEarly: false });
    handleErrors({});
    return true;
  } catch (validationErrors) {
    const formattedErrors: FormErrors = {};
    validationErrors.inner.forEach((error: yup.ValidationError) => {
      if (error.path) {
        formattedErrors[error.path] = error.message;
      }
    });
    handleErrors(formattedErrors);
    return false;
  }
};
