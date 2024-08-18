import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../types/formData.ts';
import { FormState } from '../types/formState.ts';

const initialState: FormState = {
  uncontrolledFormData: {
    name: '',
    age: null,
    country: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    file: null,
    accept: false,
  },
  hookFormData: {
    name: '',
    age: null,
    country: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    file: null,
    accept: false,
  },
  submittedForm: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolledFormData = action.payload;
    },
    setHookFormData: (state, action: PayloadAction<FormData>) => {
      state.hookFormData = action.payload;
    },
    setSubmittedForm: (state, action: PayloadAction<'uncontrolled' | 'hook'>) => {
      state.submittedForm = action.payload;
    },
  },
});

export const { setUncontrolledFormData, setHookFormData, setSubmittedForm } = formSlice.actions;
export default formSlice.reducer;
