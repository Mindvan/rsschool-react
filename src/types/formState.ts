import { FormData } from './formData.ts';
export interface FormState {
  uncontrolledFormData: FormData;
  hookFormData: FormData;
  submittedForm: 'uncontrolled' | 'hook' | null;
}
