import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import styles from './styles/ForgotPassword.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import AsyncButton from '@/components/AsyncButton';


const inter = Inter({ subsets: ['latin'] })

const ForgotPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const handleSendVerificationCode = () => {
        // simulate loading for communication with backend
        if (validateEmail()) {
            setIsLoading(true);
            setTimeout(() => {
                handleSendVerificationCodeAttempt();
                setIsLoading(false);
            }, 3000);
        }
    }

    const validateEmail = () => {
        if (email === ""){
            setErrorMessage("Email is required");
            return false;
        }
        // validate email format
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setErrorMessage("Invalid email format");
            return false;
        }
    
        return true;
    }

    const handleSendVerificationCodeAttempt = () => {
        // send email to server to check whether it exists
        // 
        // if it exists => {
        //      send verification code to email
        //       setSuccessMessage("We've sent the verification code to your email");
        //        redirect to verification page after 7 seconds
        // }
        // else {
        //      setErrorMessage("Email does not exist");
        //      return;
        // }

        // simulate sending verification code
        if (email === "test@admin.com") {
            setSuccessMessage("We've sent a verification code to your email");
            setTimeout(() => {
                router.push(`/account/reset`)
            }, 7000);
        }
        else {
            setErrorMessage("Email does not exist");
        }
    }

    const clearAllData = () => {
        setEmail("");
        setErrorMessage("");
        setSuccessMessage("");
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);

        // clear error and success message when user starts typing
        setErrorMessage("");
        setSuccessMessage("");
    }

    return (
        <div className={inter.className}>
            <nav className={styles.nav}><Link href="/" style={{width: "max-content"}}><h3>Auction Hub</h3></Link></nav>

            <div className={styles.container}>
                <h1>Forgot your Password?</h1>
                <p>If you do not have an account, <span style={{color: "#59CDFF"}}><Link href="/register">click here </Link></span> 
                    to set up a new account.
                </p>
                <form>
                    <input type="email" name="email" placeholder="Email" value={email} onChange={handleEmail}/>
                    <AsyncButton isLoading={isLoading} onClick={handleSendVerificationCode} className={styles.submit_btn}>Send me my validation code</AsyncButton>
                </form>
                {errorMessage && <div className={`${styles.error_label} ${styles.active}`}>{errorMessage || "Error occured while sending verification code"}</div> }
                {successMessage && <div className={`${styles.success_label} ${styles.active}`}>{successMessage || "We've sent the verification code to your email"}</div> }
            </div>
        </div>
    );
}

export default ForgotPassword;
