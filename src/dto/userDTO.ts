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
}

export type UserRoles = "Buyer" | "Seller" | "Admin";
