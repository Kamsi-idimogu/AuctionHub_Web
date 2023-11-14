import NotLoggedIn from "./components/NotLoggedIn"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Account = () => {

    return (
        <div className={inter.className}>
        <NotLoggedIn />
        </div>
    )
}

export default Account
