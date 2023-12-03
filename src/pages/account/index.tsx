import { useEffect } from 'react'
import { Inter } from 'next/font/google'
import router from 'next/router'
import NotLoggedIn from "./components/NotLoggedIn"
import styles from './styles/Account.module.css'
import LoadingIndicator from '@/components/LoadingIndicator'
import { useAuthStore } from '@/store/authStore'

const inter = Inter({ subsets: ['latin'] })

const Account = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

    useEffect(() => {
        // redirect to profile page if user is logged in
        if (isLoggedIn()) {
            router.push(`/account/profile`)
        }
    }, [])

    if (!isLoggedIn()) {
        return (
            <div className={inter.className}>
                <NotLoggedIn />
            </div>
        )
    }

    return (
        <div className={`${styles.loading_container} ${inter.className}`}>
            <LoadingIndicator width={100} height={100}/>
            <h1 className={styles.loading_text}>Loading...</h1>
        </div>
    )
}

export default Account
