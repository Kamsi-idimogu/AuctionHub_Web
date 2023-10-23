import React from 'react'
import styles from './styles/Signup.module.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const SignUp = () => {
    return (
        <div className={inter.className}>
            <div className={styles.page}>
            <div className={styles.image_placeholder}/>
            <section className={styles.text_container}>
                <h3 className={styles.header}>Auction Hub</h3> 
                <aside className={styles.text_body}>
                    <h1 className={styles.title}>Start Bidding Now</h1>
                    <form className={styles.form}>
                        <div className={styles.input_pair}>
                            <input type="text" name="first_name" className={styles.input_box} placeholder='First Name'/>
                            <input type="text" name="last_name" className={styles.input_box} placeholder='Last Name'/>
                        </div>
                        <div className={styles.input_pair}>
                            <input type="text" name="username" className={styles.input_box} placeholder='Username'/>
                            <input type="password" name="password" className={styles.input_box} placeholder='Password'/>
                        </div>
                        <input type="text" name="email" className={styles.input_box} placeholder='Email'/>
                        <div className={styles.input_pair}>
                            <input type="text" name="address" className={styles.input_box} placeholder='Address'/>
                            <input type="text" name="postal_code" className={styles.input_box} placeholder='Postal Code'/>
                        </div>
                        <div className={styles.input_pair}>
                            <input type="text" name="country" className={styles.input_box} placeholder='Country'/>
                            <input type="text" name="city" className={styles.input_box} placeholder='City'/>
                        </div>
                        <label className={styles.signup_checkbox}>
                           <input type="checkbox" />
                           Sign up as a Seller
                         </label>
                        <input type="submit" value="join now" className={styles.submit_btn}/>
                    </form>
                </aside>
            </section>
        </div>
        </div>
    )
}

export default SignUp
