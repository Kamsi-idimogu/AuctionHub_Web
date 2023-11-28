import styles from './styles/EditProfile.module.css';
import Navbar from '@/components/Navbar';
import EditProfileItem from './components/EditProfileItem';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { user } from '../../api/user_dummy_data';
import { formatUserAddress } from '@/utils/userAddress';

const inter = Inter({ subsets: ['latin'] })

const EditProfile = () => {
    const router = useRouter();
    const { profile_field } = router.query;

    const getUserField = (field: string | string[] | undefined) => {
        switch (field) {
            case 'first_name':
                return { label: 'First Name', value: user.first_name };
            case 'last_name':
                return { label: 'Last Name', value: user.last_name };
            case 'username':
                return { label: 'Username', value: user.username };
            case 'password':
                return { label: 'Password', value: user.password };
            case 'email':
                return { label: 'Email', value: user.email };
            case 'address':
                return { label: 'Address', value: formatUserAddress(user) };
            case 'country':
                return { label: 'Country', value: user.country };
            case 'city':
                return { label: 'City', value: user.city };
            default:
                return { label: 'First Name', value: user.first_name };
        }
    }

    return (    
        <div className={`${inter.className}`}>
            <Navbar />
            <div className={styles.container}>
                <h1>Edit Profile</h1>
                <p>Be sure to click the SAVE button when you are done.</p>
                <EditProfileItem  
                    profile={user} 
                    title={getUserField(profile_field).label}
                    oldValue={getUserField(profile_field).value}
                />
            </div>
        </div>
    );
}

export default EditProfile;