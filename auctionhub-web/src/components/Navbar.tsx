import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    return (
        <nav className={styles.navbar}>
            <section className={styles.left_component}>
                <Link href="/"><h1 className={styles.logo}>Auction Hub</h1></Link>
                {isLogged && <input type="text" placeholder="Search..." /> }
            </section>
            {isLogged ? (
                <section className={styles.right_component}>
                    <Link href="/auctions"><span className={styles.right_component_item}>Auctions</span></Link>
                    <Link href="/account"><span className={styles.right_component_item}>Account</span></Link>
                    <Link href="/logout"><span className={styles.right_component_item}>Logout</span></Link>
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