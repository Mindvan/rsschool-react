export type FormErrors = {
  [key in keyof FormData]?: string;
};
