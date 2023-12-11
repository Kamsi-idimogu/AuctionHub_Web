export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  role: UserRoles;
  street_name: string;
  street_number: string;
  postal_code: string;
  city: string;
  country: string;
  created_at?: string;
  updated_at?: string | null;
};

export type UserRoles = "buyer" | "seller" | "admin";
