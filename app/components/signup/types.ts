export type FormState = {
  name: string;
  email: string;
  password: string;
  company: string;
  teamSize: string;
  priorityArea: string;
};

export type UpdateFn = (
  key: keyof FormState
) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
