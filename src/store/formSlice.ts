import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
  name: string;
  age: number | null;
  country: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  file: File | null;
  accept: boolean;
}

interface FormState {
  uncontrolledFormData: FormData;
  hookFormData: FormData;
}

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
  },
});

export const { setUncontrolledFormData, setHookFormData } = formSlice.actions;
export default formSlice.reducer;
