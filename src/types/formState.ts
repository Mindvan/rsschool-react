import { FormData } from './formData.ts';
export interface FormState {
  uncontrolledFormData: FormData;
  hookFormData: FormData;
  submissions: FormData[];
}
