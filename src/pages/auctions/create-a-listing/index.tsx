import { Inter } from 'next/font/google';
import styles from './styles/CreateListing.module.css';
import Navbar from '@/components/Navbar';
import CreateListing from './components/CreateListing';

const inter = Inter({ subsets: ['latin'], weight: ["400", "500", "600", "700", "800", "900"] })

const CreateListingPage: React.FC = () => {
    return (
        <div className={inter.className}>
            <CreateListing />
        </div>
    );
}

export default CreateListingPage;
