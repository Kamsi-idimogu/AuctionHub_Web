import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import styles from './styles/OrderReceipt.module.css';
import Button from '@/components/Button';

const inter = Inter({ subsets: ['latin'] })

const OrderReceipt = () => {
    return (
        <div className={inter.className}>
            <Navbar />

            <div className={styles.container}>
                <h1>Order Confirmed</h1>
                <p><b>Hi John, </b> Your order has been successfully
                confirmed and will be shipped within 3 to 5 business 
                days.</p>

                <section className={styles.order_details}>
                    <p><b>First Name: </b> John</p>
                    <p><b>Last Name: </b> Smith</p>
                    <p><b>Address: </b> 4700 Keele St.</p>
                    <p><b>City: </b> North York</p>
                    <p><b>Country: </b> Canada</p>
                    <p className={styles.item_space}><b>Postal Code: </b> M3J 1P3</p>

                    <p><b>Subtotal: </b> $150</p>
                    <p><b>Shipping: </b> $14</p>
                    <p className={styles.item_space}><b>Total: </b> $164.00</p>

                    <Button onClick={()=>{}} className={styles.btn}>
                        <div>Back to Home</div>
                    </Button>

                </section>
            </div>
        </div>
    )
}

export default OrderReceipt;