import { useEffect } from 'react'
import { Inter } from 'next/font/google'
import { user } from '../api/user_dummy_data'
import router from 'next/router'
import NotLoggedIn from "./components/NotLoggedIn"

const inter = Inter({ subsets: ['latin'] })

const Account = () => {

    // useEffect(() => {
    //     // redirect to profile page if user is logged in
    //     if (user) {
    //         router.push(`/account/profile`)
    //     }
    // }, [])

    return (
        <div className={inter.className}>
            <NotLoggedIn />
        </div>
    )
}

export default Account
