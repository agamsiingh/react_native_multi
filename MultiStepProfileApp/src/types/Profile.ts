export interface Profile {
  id: string;
  fullName: string;
  email: string;
  age: number;
  city: string;
  state: string;
  country: string;
}

export type PartialProfile = Partial<Profile>;
