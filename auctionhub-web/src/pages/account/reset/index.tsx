import { Inter } from 'next/font/google';
import styles from './styles/ResetPassword.module.css'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

const ResetPassword = () => {
    return (
        <div className={inter.className}>
        <nav className={styles.nav}><h3>Auction Hub</h3></nav>

        <div className={styles.container}>
            <h1>Forgot your Password?</h1>
                <p>If you do not have an account, <span style={{color: "#59CDFF"}}><Link href="/register">click here </Link></span> 
                 to set up a new account.
                </p>
                <form>
                    <input type="text" name="verification_code" placeholder="Verification Code" />
                    <input type="password" name="password" placeholder="New Password" />
                    <input type="password" name="confirm_password" placeholder="Confirm New Password" />
                    <button type="submit">reset password</button>
                </form>
        </div>
    </div>
    );
}

export default ResetPassword;