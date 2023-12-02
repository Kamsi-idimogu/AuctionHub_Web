import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import styles from './styles/ResetPassword.module.css'
import Link from 'next/link';
import AsyncButton from '@/components/AsyncButton';

const inter = Inter({ subsets: ['latin'] })

const ResetPassword = () => {
    const router = useRouter();
    const [verificationCode, setVerificationCode] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleResetPassword = () => {
        // simulate loading for communication with backend
        if (validateResetPassword()) {
            setIsLoading(true);
            setTimeout(() => {
                handleResetPasswordAttempt();
                setIsLoading(false);
            }, 3000);
        }
    }

    const validateResetPassword = () => {
        if (verificationCode === ""){
            setErrorMessage("Verification code is required");
            return false;
        }
        if (password === ""){
            setErrorMessage("Password is required");
            return false;
        }
        if (confirmPassword === ""){
            setErrorMessage("Confirm password is required");
            return false;
        }
        if (password !== confirmPassword){
            setErrorMessage("Passwords do not match");
            return false;
        }
        return true;
    }

    const handleResetPasswordAttempt = () => {
        // send verification code to server to check whether it is valid
        //
        // if it is valid => {
        //      reset password
        //      setSuccessMessage("Your password has been reset successfully");
        //      redirect to login page after 7 seconds
        // }
        // else {
        //      setErrorMessage("Invalid verification code");
        //      return;
        // }

        // simulate resetting password
        if (verificationCode === "000000") {
            setSuccessMessage("Your password has been reset successfully");
            setTimeout(() => {
                router.push(`/login`)
            }, 7000);
        }
        else {
            setErrorMessage("Invalid verification code");
        }
    }

    const clearAllData = () => {
        setVerificationCode("");
        setPassword("");
        setConfirmPassword("");
        setErrorMessage("");
        setSuccessMessage("");
    }

    const handleVerificationCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(e.target.value);

        // clear error message when user starts typing
        setErrorMessage("");
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);

        // clear error message when user starts typing
        setErrorMessage("");
    }

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);

        // clear error message when user starts typing
        setErrorMessage("");
    }

    return (
        <div className={inter.className}>
            <nav className={styles.nav}><Link href="/" style={{width: "max-content"}}><h3>Auction Hub</h3></Link></nav>

            <div className={styles.container}>
                <h1>Reset your Password</h1>
                <p>If you do not have an account, <span style={{color: "#59CDFF"}}><Link href="/register">click here </Link></span> 
                to set up a new account.
                </p>
                <form>
                    <input type="text" name="verification_code" placeholder="Verification Code" value={verificationCode} onChange={handleVerificationCode}/>
                    <input type="password" name="password" placeholder="New Password" value={password} onChange={handlePassword}/>
                    <input type="password" name="confirm_password" placeholder="Confirm New Password" value={confirmPassword} onChange={handleConfirmPassword}/>
                    <AsyncButton onClick={handleResetPassword} className={styles.submit_btn} isLoading={isLoading}>Reset Password</AsyncButton>
                </form>
                {errorMessage && <div className={`${styles.error_label} ${styles.active}`}>{errorMessage || "Error occured while retrieving verification code"}</div> }
                {successMessage && <div className={`${styles.success_label} ${styles.active}`}>{successMessage || "Your password has been reset successfully"}</div> }
            </div>
        </div>
    );
}

export default ResetPassword;