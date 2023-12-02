import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import router from 'next/router';
import { useAuth } from '@/contexts/authContext';

const Navbar = () => {
    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const { isLoggedIn, logout } = useAuth();

    const LogoutUser = () => {
        logout();
        router.push('/');
    }

    return (
        <nav className={styles.navbar}>
            <section className={styles.left_component}>
                <Link href="/"><h1 className={styles.logo}>Auction Hub</h1></Link>
                {isLoggedIn && <input type="text" placeholder="Search..." /> }
            </section>
            {isLoggedIn ? (
                <section className={styles.right_component}>
                    <Link href="/auctions"><span className={styles.right_component_item}>Auctions</span></Link>
                    <Link href="/account"><span className={styles.right_component_item}>Account</span></Link>
                    <div style={{cursor: 'pointer'}} onClick={LogoutUser}><span className={styles.right_component_item}>Logout</span></div>
                </section>
                ) : (
                <section className={styles.right_component}>
                    <Link href="/auctions"><span className={styles.right_component_item}>Auctions</span></Link>
                    <Link href="/login"><span className={styles.right_component_item}>Log in</span></Link>
                </section>
            )}
        </nav>
    )
}

export default Navbar