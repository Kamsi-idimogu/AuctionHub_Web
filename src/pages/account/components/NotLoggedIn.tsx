import React from 'react'
import styles from '../styles/Account.module.css'
import Link from 'next/link'
import Button from '@/components/Button'

const NotLoggedIn = () => {

    const navigateToLogin = () => {
        window.location.href = '/login'
    }

    const navigateToSignUp = () => {
        window.location.href = '/register'
    }

    return (
        <div className={styles.page}>
        <div className={styles.image_placeholder}/>
        <section className={styles.text_container}>
            <h3 className={styles.header}>Auction Hub</h3> 
            <aside>
                <h1 className={styles.title}>Welcome to Auction Hub</h1>
                <p className={styles.text}>
                    Discover a world of unique auctions and unmatched deals.
                    Venture into an oasis of premium selections.
                </p>
                <Button onClick={navigateToLogin} className={styles.btn}>
                    Sign In
                </Button>
                <Button onClick={navigateToSignUp} className={styles.btn_secondary}>
                    Sign Up
                </Button>
            </aside>
        </section>
    </div>
    )
}

export default NotLoggedIn