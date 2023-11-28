import Link from 'next/link';
import styles from '../styles/ResetPassword.module.css';
import { User } from '@/dto';

interface EditProfileItemProps {
    profile: User
    onResetProfile?: (profile: User) => void
    title: string
    oldValue?: string
    profile_field?: string
}

const EditProfileItem = ({ profile, onResetProfile, title, oldValue }: EditProfileItemProps) => {
    return (
        <form>
            <label>New {title}</label>
            <input type="text" name={title} placeholder={oldValue || "Enter Here"} />
            <button type="submit">Save</button>
        </form>
    )
}

export default EditProfileItem