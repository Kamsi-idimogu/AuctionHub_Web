import { Inter } from "next/font/google";
import styles from "./styles/Checkout.module.css";
import Navbar from "@/components/Navbar";
import ProtectedComponent from "@/components/ProtectedComponent";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const Checkout = () => {
  return (
    <ProtectedComponent>
      <div className={inter.className}>
        <Navbar />
        <div className={styles.container}>
          <h1>Winner!</h1>
          <p>
            <b>Congratulations John, </b> You have won the auction for the {`"Smart Watch"`}, please
            fill in your payment information
          </p>
          <div className={styles.checkout_details}>
            <section className={styles.shipping_payment}>
              <p>
                <b>First Name: </b>John
              </p>
              <p>
                <b>Last Name: </b>Smith
              </p>
              <p>
                <b>Address: </b>4700 Keele St.
              </p>
              <p>
                <b>City: </b>North York
              </p>
              <p>
                <b>Country: </b>Canada
              </p>
              <p>
                <b>Postal Code: </b>M3J 1P3
              </p>

              <form className={styles.form}>
                <div className={styles.card_number_details}>
                  <label>Credit Card Number</label>
                  <input type="text" name="card_number" />
                </div>
                <div className={styles.card_details}>
                  <div className={styles.card_details_left}>
                    <label>Expiration Date</label>
                    <input type="text" name="expiration_date" />
                  </div>
                  <div className={styles.card_details_right}>
                    <label>CVV</label>
                    <input type="text" name="cvv" />
                  </div>
                </div>
                <button type="submit">submit</button>
              </form>
            </section>
            <section className={styles.order_summary}>
              <h1>Total</h1>
              <div className={styles.order_item}>
                <p>Smart Watch</p>
                <div className={styles.image_placeholder} />
              </div>
              <aside className={styles.order_prices}>
                <p>Subtotal:</p>
                <p>$150.00</p>
              </aside>
              <aside className={styles.order_prices}>
                <p>Shipping:</p>
                <p>$14.00</p>
              </aside>
              <aside className={styles.order_prices}>
                <p>
                  <b>Total:</b>
                </p>
                <p>
                  <b>$164.00</b>
                </p>
              </aside>
              <label className={styles.order_checkbox}>
                <input type="checkbox" />
                <i>Expedited Shipping: $25</i>
              </label>
            </section>
          </div>
        </div>
      </div>
    </ProtectedComponent>
  );
};

export default Checkout;
