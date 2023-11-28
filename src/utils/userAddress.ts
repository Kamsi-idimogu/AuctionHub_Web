import { User } from "@/dto";

export const formatUserAddress = (user: User) => {
    return `${user.street_number}, ${user.street_name}`;
}