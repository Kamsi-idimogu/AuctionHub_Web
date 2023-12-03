import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import router from 'next/router';
import { useAuthStore } from '@/store/authStore';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<string[]>([]);
     const { isLoggedIn, logout } = useAuthStore();

    const LogoutUser = () => {
        logout();
        router.push('/');
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/auctions?search=${searchValue}`);
        }
    }

    return (
        <nav className={styles.navbar}>
            <section className={styles.left_component}>
                <Link href="/"><h1 className={styles.logo}>Auction Hub</h1></Link>
                {isLoggedIn() && <input type="text" placeholder="Search..." value={searchValue} onChange={handleSearch} onKeyDown={handleKeyDown} />}
            </section>
            {isLoggedIn() ? (
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
