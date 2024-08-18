export interface FormData {
  name: string;
  age: number | null;
  country: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  file: File | string | null;
  accept: boolean;
}
