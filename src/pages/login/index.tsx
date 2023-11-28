import React from 'react';
import Link from 'next/link';
import styles from './styles/Login.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import AsyncButton from '@/components/AsyncButton';
import router from 'next/router'

const inter = Inter({ subsets: ['latin'] })

const Login = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLogin = () => {

        // simulate loading for communication with backend
        if (validateLogin()) {
            setIsLoading(true);
            setTimeout(() => {
                handleLoginAttempt();
                setIsLoading(false);
            }, 3000);
        }
    }

    const validateLogin = () => {
        if (username === ""){
            setErrorMessage("Username is required");
            return false;
        }
        if (password === ""){
            setErrorMessage("Password is required");
            return false;
        }
        return true;
    }

    // simulate login attempt / communication with backend
    const handleLoginAttempt = () => {
        if (username === "admin" && password === "admin") {
            clearAllData();
            // redirect to profile page
            router.push(`/account/profile`)
        }
        else {
            setErrorMessage("Invalid username or password");
        }
    }

    const clearAllData = () => {
        setUsername("");
        setPassword("");
        setErrorMessage("");
    }


    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        console.log(username);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        console.log(password);
    }

    const user = null;

    useEffect(() => {
        // redirect to profile page if user is logged in
        if (user) {
            router.push(`/account/profile`)
        }
    }, [])

    return (
        <div className={`${styles.page} ${inter.className}`}>
            <div className={styles.image_container}>
                <Image src={"/images/banner.png"} alt="login-banner" width={713} height={1024} />
            </div>
            <section className={styles.text_container}>
                <Link href="/" style={{width: 'max-content'}}>
                    <h3 className={styles.header}>Auction Hub</h3> 
                </Link>
                <aside className={styles.text_body}>
                    <h1 className={styles.title}>Login to Start Bidding</h1>
                    <form className={styles.form}>
                        <input type="text" name="username" className={styles.input_box} placeholder='Username' value={username} onChange={handleUsername}/>
                        <input type="password" name="password" className={styles.input_box} placeholder='Password' value={password} onChange={handlePassword}/>
                        <label className={`${styles.error_label} ${errorMessage && styles.active}`}>{errorMessage || "Invalid username or password"}</label>
                        <AsyncButton onClick={handleLogin} className={styles.submit_btn} isLoading={isLoading}>Login</AsyncButton>
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
