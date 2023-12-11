"use client";
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar';
import styles from './styles/EditProfile.module.css';
import ProtectedComponent from '@/components/ProtectedComponent';

const inter = Inter({ subsets: ['latin'] })

const EditProfile: React.FC = () => {

    return (
        <ProtectedComponent>
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
        </ProtectedComponent>
    )
}

export default EditProfile;