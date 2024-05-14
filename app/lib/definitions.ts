export type User = {
  name: string;
  email: string;
  password: string;
}

export type Application = {
  id: string;
  role: string;
  company: string;
  job_posting: string;
  date_applied: string;
  status: string;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}