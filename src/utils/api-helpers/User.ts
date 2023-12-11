import { UserResponse } from "@/pages/api/api-contracts/responses/User"
import { User } from "@/dto/userDTO"

const CreateUserResponseFromServer = (data: any): UserResponse => {
    return {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        password: data.password,
        email: data.email,
        street_name: data.street_name,
        street_number: data.street_number,
        postal_code: data.postal_code,
        country: data.country,
        city: data.city,
        role: data.role,
        created_at: data.created_at,
        updated_at: data.updated_at,
    }
}

export const CreateUserFromServer = (data: any): User => {
    return {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        password: data.password,
        email: data.email,
        street_name: data.street_name,
        street_number: data.street_number,
        postal_code: data.postal_code,
        country: data.country,
        city: data.city,
        role: data.role,
        created_at: data.created_at,
        updated_at: data.updated_at,
    }
}
