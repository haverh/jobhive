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

export type Links = {
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

