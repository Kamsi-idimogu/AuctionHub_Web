"use client";
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar';
import styles from './styles/EditProfile.module.css';
import { user } from '../../api/user_dummy_data';
import router from 'next/router';

const inter = Inter({ subsets: ['latin'] })

const EditProfile: React.FC = () => {
    // // redirect to login page if user is not logged in
    // if (!user) {
    //     router.push('/login');
    // }

    // // redirect to edit profile page if user is logged in, using their id
    // if (user) {
    //     router.push(`/account/reset/${user.id}`);
    // }

    return (
        <div className={`${inter.className}`}>
            <Navbar />
            <div className={styles.container}>
                <h1>Edit Profile</h1>
                <p>Be sure to click the SAVE button when you are done.</p>
                <form>
                    <label>New First Name</label>
                    <input type="text" name="firstname" placeholder="Enter Here" />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile;