import * as yup from 'yup';

const hasUppercase = /[A-Z]/;
const hasLowercase = /[a-z]/;
const hasNumber = /\d/;
const hasSpecialChar = /[@$!%*?&]/;

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required.')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter.')
    .min(2, 'Password must be at least 2 characters.'),

  age: yup
    .number()
    .nullable()
    .required('Age is required.')
    .positive('Age must be a positive number.')
    .integer('Age must be an integer.'),

  gender: yup.string().required('Gender is required.'),

  country: yup.string().required('Country is required.'),

  email: yup.string().email('Invalid email format.').required('Email is required.'),

  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .test('has-uppercase', 'Password must include at least one uppercase letter.', value => hasUppercase.test(value))
    .test('has-lowercase', 'Password must include at least one lowercase letter.', value => hasLowercase.test(value))
    .test('has-number', 'Password must include at least one number.', value => hasNumber.test(value))
    .test('has-special', 'Password must include at least one special character.', value => hasSpecialChar.test(value)),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match.')
    .required('Confirm password is required.'),

  file: yup
    .mixed()
    .test('fileSize', 'File is too large. Maximum is 100KB.', value => {
      return value && value.size <= 102400;
    })
    .test('fileType', 'Unsupported File Format', value => {
      return !(value && !['image/jpeg', 'image/png'].includes(value.type));
    })
    .required('File is required.'),

  accept: yup.boolean().oneOf([true], 'You must accept the terms and conditions.'),
});
