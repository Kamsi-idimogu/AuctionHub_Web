import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import styles from "./styles/OrderReceipt.module.css";
import Button from "@/components/Button";
import ProtectedComponent from "@/components/ProtectedComponent";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";

const inter = Inter({ subsets: ["latin"] });

interface OrderReceiptProps {
  subtotal?: number;
  shipping?: number;
  total?: number;
}

const OrderReceipt = ({ subtotal, shipping, total }:OrderReceiptProps) => {
  const router = useRouter();
  const { user } = useAuthStore();

  const navigateToHome = () => {
    router.push("/");
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  }

  return (
    // <ProtectedComponent>
      <div className={inter.className}>
        <Navbar />

        <div className={styles.container}>
          <h1>Order Confirmed</h1>
          <p>
            <b>Hi {user?.first_name}, </b> Your order has been successfully confirmed and will be shipped within 3
            to 5 business days.
          </p>

          <section className={styles.order_details}>
            <p>
              <b>First Name: </b> {user?.first_name}
            </p>
            <p>
              <b>Last Name: </b> {user?.last_name}
            </p>
            <p>
              <b>Address: </b> {`${user?.street_number}, ${user?.street_name}`}
            </p>
            <p>
              <b>City: </b> {user?.city}
            </p>
            <p>
              <b>Country: </b> {user?.country}
            </p>
            <p className={styles.item_space}>
              <b>Postal Code: </b> {user?.postal_code}
            </p>

            <p>
              <b>Subtotal: </b> {subtotal && formatCurrency(subtotal)}
            </p>
            <p>
              <b>Shipping: </b> {shipping && formatCurrency(shipping)}
            </p>
            <p className={styles.item_space}>
              <b>Total: </b> {total && formatCurrency(total)}
            </p>

            <Button onClick={navigateToHome} className={styles.btn}>
              <div>Back to Home</div>
            </Button>
          </section>
        </div>
      </div>
    // </ProtectedComponent>
  );
};

export default OrderReceipt;
