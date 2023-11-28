import { Inter } from 'next/font/google';
import styles from './styles/ForgotPassword.module.css'
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] })

const ForgotPassword = () => {
    return (
        <div className={inter.className}>
            <nav className={styles.nav}><Link href="/" style={{width: "max-content"}}><h3>Auction Hub</h3></Link></nav>

            <div className={styles.container}>
                <h1>Forgot your Password?</h1>
                    <p>If you do not have an account, <span style={{color: "#59CDFF"}}><Link href="/register">click here </Link></span> 
                     to set up a new account.
                    </p>
                    <form>
                        <input type="email" name="email" placeholder="Email" />
                        <button type="submit">Send me my validation code</button>
                    </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
