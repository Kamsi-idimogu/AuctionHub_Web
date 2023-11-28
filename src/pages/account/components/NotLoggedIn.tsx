import React from 'react'
import styles from '../styles/Account.module.css'
import Link from 'next/link'
import Button from '@/components/Button'
import Image from 'next/image'

const NotLoggedIn = () => {

    const navigateToLogin = () => {
        window.location.href = '/login'
    }

    const navigateToSignUp = () => {
        window.location.href = '/register'
    }

    return (
        <div className={styles.page}>
        <div className={styles.image_container}>
            <Image src={"/images/banner.png"} alt="banner" width={713} height={1024} />
        </div>
        <section className={styles.text_container}>
            <Link href="/" style={{width: 'max-content'}}>
                <h3 className={styles.header}>Auction Hub</h3> 
            </Link>
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