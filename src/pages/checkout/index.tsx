import { Inter } from "next/font/google";
import styles from "./styles/Checkout.module.css";
import Navbar from "@/components/Navbar";
import ProtectedComponent from "@/components/ProtectedComponent";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { ViewCatalogResponse } from "../auctions";
import { makePayment, viewCatalog, viewWatchList } from "../api/bidder/bidder-api";
import AsyncButton from "@/components/AsyncButton";
import Image from "next/image";
import OrderReceipt from "../receipt";
import { WatchListResponse } from "../account/profile";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const Checkout = () => {
  const router = useRouter();
  const { query } = router;

  const { user } = useAuthStore();

  const DEFAULT_SHIPPING_COST = 15;

  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [auctionItem, setAuctionItem] = useState<ViewCatalogResponse>();
  const [shippingCost, setShippingCost] = useState<number>(DEFAULT_SHIPPING_COST);
  const [expiditedShipping, setExpeditedShipping] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [cardDetails, setCardDetails] = useState<any>({
    card_number: "",
    expiration_date: "",
    cvv: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   // check if payments have been made
  //   // if so, show receipt
  //   // setShowReceipt(true);
  // }, []);

  useEffect(() => {
    if (query?.id && typeof query.id === "string") {
      const fetchInitialBidItems = async () => {
        let response: any;
        try {
          response = await viewWatchList();

          const found = response.data?.find(
            (auction: any) => auction.listing_item_id === Number(query.id as string)
          );
          if (found) {
            setAuctionItem(found);
            setTotal(found.current_bid_price + DEFAULT_SHIPPING_COST);
          } else {
            setPageLoading(false);
            router.push("/auctions");
          }
        } catch (error) {
          console.log(error);
          return;
        } finally {
          // setPageLoading(false);
        }
      };

      fetchInitialBidItems();
    } else {
      router.push("/auctions");
    }
    setPageLoading(false);
  }, []);
  // }, [router, query?.id]);

  if (pageLoading) {
    return (
      <div className={`${styles.loading_container}`}>
        <LoadingIndicator width={100} height={100} />
        <h1 className={styles.loading_text}>Loading...</h1>
      </div>
    );
  }

  const calculateShippingCost = () => {
    if (expiditedShipping) {
      setShippingCost(DEFAULT_SHIPPING_COST);
      const total = auctionItem?.current_bid_price || 0;
      setTotal(total + DEFAULT_SHIPPING_COST);
      return;
    }
    const minimum_shipping_cost = 25;
    const current_bid_price = auctionItem?.current_bid_price || 0;
    const calculated_shipping_cost = current_bid_price * 0.05;
    const shipping_cost = Math.max(minimum_shipping_cost, calculated_shipping_cost);
    setShippingCost(shipping_cost);
    setTotal(current_bid_price + shipping_cost);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const handleExpeditedShippingClick = () => {
    setExpeditedShipping(!expiditedShipping);
    calculateShippingCost();
  };

  const handleCardDetailsChange = (e: any) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails: any) => ({ ...prevDetails, [name]: value }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validateCardDetails = () => {
    if (isNaN(cardDetails.card_number) || cardDetails.card_number.length !== 16) {
      setErrorMessage("Invalid card number");
      return false;
    }
    if (isNaN(cardDetails.expiration_date) || cardDetails.expiration_date.length !== 4) {
      setErrorMessage("Invalid expiration date");
      return false;
    }
    if (isNaN(cardDetails.cvv) || cardDetails.cvv.length !== 3) {
      setErrorMessage("Invalid cvv");
      return false;
    }
    return true;
  };

  const hanldeCheckout = async () => {
    if (!validateCardDetails()) {
      return;
    }
    setSubmitLoading(true);
    let resp: any;

    try {
      const listing_id = auctionItem?.listing_item_id || -1;
      const user_id = user?.id || -1;
      resp = await makePayment(listing_id, user_id);

      if (resp?.status === "failed") {
        alert("Error occured while making payment. Please try again later.");
        setErrorMessage("Error occured while making payment. Please try again later.");
        return;
      }

      if (resp?.status === false) return;

      setShowReceipt(true);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error occured while making payment. Please try again later.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (showReceipt) {
    return (
      <OrderReceipt
        total={total}
        subtotal={auctionItem?.current_bid_price}
        shipping={shippingCost}
      />
    );
  }
  return (
    // <ProtectedComponent>
    <div className={inter.className}>
      <Navbar />
      <div className={styles.container}>
        <h1>Winner!</h1>
        <p>
          <b>Congratulations {user?.first_name}, </b> You have won the auction for the{" "}
          {auctionItem?.name}, please fill in your payment information
        </p>
        <div className={styles.checkout_details}>
          <section className={styles.shipping_payment}>
            <p>
              <b>First Name: </b>
              {user?.first_name}
            </p>
            <p>
              <b>Last Name: </b>
              {user?.last_name}
            </p>
            <p>
              <b>Address: </b>
              {`${user?.street_number}, ${user?.street_name}`}
            </p>
            <p>
              <b>City: </b>
              {user?.city}
            </p>
            <p>
              <b>Country: </b>
              {user?.country}
            </p>
            <p>
              <b>Postal Code: </b>
              {user?.postal_code}
            </p>

            <form className={styles.form}>
              <div className={styles.card_number_details}>
                <label>Credit Card Number</label>
                <input
                  type="text"
                  name="card_number"
                  placeholder="0000-0000-0000-0000"
                  value={cardDetails.card_number}
                  onChange={handleCardDetailsChange}
                />
              </div>
              <div className={styles.card_details}>
                <div className={styles.card_details_left}>
                  <label>Expiration Date</label>
                  <input
                    type="text"
                    name="expiration_date"
                    placeholder="MMYY"
                    value={cardDetails.expiration_date}
                    onChange={handleCardDetailsChange}
                  />
                </div>
                <div className={styles.card_details_right}>
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="000"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                  />
                </div>
              </div>
              <div className={`${styles.error_label} ${errorMessage && styles.active}`}>
                {errorMessage || "Invalid card details"}
              </div>
              <AsyncButton
                onClick={hanldeCheckout}
                className={styles.submit_btn}
                isLoading={submitLoading}
              >
                Submit
              </AsyncButton>
            </form>
          </section>
          <section className={styles.order_summary}>
            <h1>Total</h1>
            <div className={styles.order_item}>
              <p>{auctionItem?.name}</p>
              {auctionItem && (
                <Image src={auctionItem.image_url} alt="auction-item" width={200} height={190} />
              )}
            </div>
            <aside className={styles.order_prices}>
              <p>Subtotal:</p>
              <p>{formatCurrency(auctionItem?.current_bid_price || 0)}</p>
            </aside>
            <aside className={styles.order_prices}>
              <p>{expiditedShipping ? "Expedited Shipping" : "Shipping:"}</p>
              <p>{formatCurrency(shippingCost)}</p>
            </aside>
            <aside className={styles.order_prices}>
              <p>
                <b>Total:</b>
              </p>
              <p>
                <b>{formatCurrency(total)}</b>
              </p>
            </aside>
            <label className={styles.order_checkbox}>
              <input
                type="checkbox"
                // onClick={handleExpeditedShippingClick}
                checked={expiditedShipping}
                onChange={handleExpeditedShippingClick}
                defaultChecked={expiditedShipping}
              />
              <i>Get Expedited Shipping</i>
            </label>
          </section>
        </div>
      </div>
    </div>
    // </ProtectedComponent>
  );
};

export default Checkout;
