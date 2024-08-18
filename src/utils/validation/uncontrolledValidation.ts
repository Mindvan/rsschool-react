import * as yup from 'yup';
import { FormErrors } from '../../types/formErrors.ts';
import { FormData } from '../../store/formSlice';
import { schema } from './schema.ts';

export const validateForm = async (data: FormData, handleErrors: (errors: FormErrors) => void) => {
  try {
    await schema.validate(data, { abortEarly: false });
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
