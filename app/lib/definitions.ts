export type User = {
  name: string;
  email: string;
  password: string;
}

export type Application = {
  role: string;
  company: string;
  date_applied: Date;
  status: string;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}