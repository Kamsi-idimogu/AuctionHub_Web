import { Inter } from 'next/font/google';
import styles from './styles/CreateListing.module.css';
import Navbar from '@/components/Navbar';
import CreateListing from './components/CreateListing';
import ProtectedComponent from '@/components/ProtectedComponent';

const inter = Inter({ subsets: ['latin'], weight: ["400", "500", "600", "700", "800", "900"] })

const CreateListingPage: React.FC = () => {
    return (
        <ProtectedComponent>
            <div className={inter.className}>
                <CreateListing />
            </div>
        </ProtectedComponent>
    );
}

export default CreateListingPage;
