import React from 'react';
import Link from 'next/link';
import styles from './styles/Login.module.css';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Login = () => {
    return (
        <div className={`${styles.page} ${inter.className}`}>
            <div className={styles.image_placeholder}/>
            <section className={styles.text_container}>
                <h3 className={styles.header}>Auction Hub</h3> 
                <aside className={styles.text_body}>
                    <h1 className={styles.title}>Login to Start Bidding</h1>
                    <form className={styles.form}>
                        <input type="text" name="username" className={styles.input_box} placeholder='Username'/>
                        <input type="password" name="password" className={styles.input_box} placeholder='Password'/>
                        <input type="submit" value="Login" className={styles.submit_btn}/>
                    </form>
                    <Link href="/account/forgot-password">
                        <i><p className={styles.reset_password}>Forgot your password?</p></i>
                    </Link>
                </aside>
            </section>
        </div>
    )
}

export default Login
