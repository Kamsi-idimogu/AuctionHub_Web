import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { auctions } from "@/pages/api/auction_item_dummy_data";
import { AuctionItem } from "@/dto";
import { Inter } from "next/font/google";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import styles from "./AuctionItemPage.module.css";
import Button from "@/components/Button";
import BidHistoryModal from "./BidHistoryModal";
import { EpochToDateTime } from "@/utils/dateTime";
import AsyncButton from "@/components/AsyncButton";
import { viewBiddingHistory, viewCatalog } from "@/pages/api/bidder/bidder-api";
import AuctionCountdown from "@/components/AuctionCountdown";
import { ViewCatalogResponse } from "..";
import { useWebSocket } from "@/contexts/wsContext";
import { LISTEN_FOR_BID_EVENT, PLACE_BID_EVENT } from "@/pages/api/endpoints";
import { useAuthStore } from "@/store/authStore";
import { Socket } from "socket.io-client";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const dummy_data: ViewCatalogResponse = {
  id: 1,
  name: "Test",
  description: "Test",
  image_url: "/images/dummy-product.png",
  decrement_amount: 1,
  auction_type: "forward",
  current_bid_price: 100,
  end_time: "1701834593247",
  listing_item_id: 1,
  seller_id: 1,
  starting_bid_price: 100,
};

const AuctionItemPage = () => {
  const router = useRouter();
  const { auction_id } = router.query;
  const [auctionItem, setAuctionItem] = useState<ViewCatalogResponse | undefined>();
  const [showBidHistory, setShowBidHistory] = useState<boolean>(false);
  const [isBidHistoryLoading, setIsBidHistoryLoading] = useState<boolean>(false);
  const [isDutchBidLoading, setIsDutchBidLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [auctionItems, setAuctionItems] = useState<ViewCatalogResponse[]>([]);
  const [bidAmount, setBidAmount] = useState<number | null>(null);
  const { user, isLoggedIn } = useAuthStore();
  const [wsSocket, setWsSocket] = useState<Socket | null>(null);

  const toggleBidHistory = async () => {
    if (showBidHistory) {
      setShowBidHistory(false);
      return;
    }
    setIsBidHistoryLoading(true);
    if (typeof auction_id !== "string") return;

    let resp: any;

    try {
      resp = await viewBiddingHistory(parseInt(auction_id));

      if (resp?.status === "failed") {
        alert("Error occured while fetching bid history. Please try again later.");
        return;
      }

      if (resp?.status === false) return;

      setBidHistory(resp?.data);
      console.log(resp?.data);
      setShowBidHistory(true);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error occured while fetching bid history. Please try again later.");
    } finally {
      setIsBidHistoryLoading(false);
    }
  };

  //   useEffect(() => {
  //     console.log(auctionItems);
  //     if (auction_id) {
  //       const found = auctionItems?.find(
  //         (auction) => auction.listing_item_id === parseInt(auction_id as string)
  //       );
  //       if (found) setAuctionItem(found);
  //     }
  //   }, [auction_id]);

  const [bidHistory, setBidHistory] = useState([
    { bidder_name: "Ken Carson", bid_amount: 135, created_at: "14:45:34" },
    { bidder_name: "Jack Frost", bid_amount: 130, created_at: "14:40:12" },
    { bidder_name: "Ken Carson", bid_amount: 120, created_at: "14:35:30" },
    { bidder_name: "Ryan", bid_amount: 105, created_at: "14:34:50" },
    { bidder_name: "John Doe", bid_amount: 100, created_at: "14:34:34" },
  ]);

  const NavigateToTerms = () => {
    router.push(`/terms-and-conditions`);
  };

  const { connectToSocket, disconnectSocket } = useWebSocket();

  useEffect(() => {
    const socket = connectToSocket();

    setWsSocket(socket);

    const fetchInitialBidItems = async () => {
      let response: any;
      try {
        response = await viewCatalog();
        setAuctionItems(response.data);

        console.log("auction_id", response);

        if (auction_id) {
          const found = response.data?.find(
            (auction: any) => auction.listing_item_id === Number(auction_id as string)
          );
          console.log("found1", found);
          if (found) {
            setAuctionItem(found);
            console.log("found", found);
          }
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };

    fetchInitialBidItems();

    socket?.on(LISTEN_FOR_BID_EVENT, (data) => {
      const { listing_item_id, current_bid_price, bidder_id } = data?.data;

      if (auctionItem?.listing_item_id === listing_item_id) {
        setAuctionItem((prevItem) => {
          if (prevItem) {
            return { ...prevItem, current_bid_price: current_bid_price };
          }
          return prevItem;
        });

        if (auctionItem?.auction_type === "dutch" && bidder_id === user?.id) {
          router.push(`/`);
        }
      }
      console.log("listening for bid event", listing_item_id, current_bid_price);
    });

    return () => {
      socket?.off(LISTEN_FOR_BID_EVENT);
      disconnectSocket();
    };
  }, [auctionItem?.listing_item_id, auction_id, connectToSocket, disconnectSocket]);

  if (!auctionItem) {
    return (
      <div className={inter.className}>
        <Navbar />
        <div className={styles.container}>
          <h1 style={{ textAlign: "center" }}>Auction for this item has ended</h1>
        </div>
      </div>
    );
  }

  function placeBid() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (!validateBid()) return;
    const bidData = {
      listing_item_id: auctionItem?.listing_item_id,
      bid_amount: Number(bidAmount),
      bidder_id: user?.id,
    };

    // console.table(bidData);

    wsSocket?.emit(PLACE_BID_EVENT, bidData);
    setBidAmount(null);

    console.log("bid placed");
  }

  function placeDutchBid() {
    setIsDutchBidLoading(true);
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    const bidData = {
      listing_item_id: auctionItem?.listing_item_id,
      bid_amount: auctionItem?.current_bid_price,
      bidder_id: user?.id,
    };

    wsSocket?.emit(PLACE_BID_EVENT, bidData);
    setIsDutchBidLoading(false);
  }

  const validateBid = () => {
    if (bidAmount && isNaN(bidAmount)) {
      setErrorMessage("Bid amount must be a number");
      return false;
    }
    if (bidAmount === 0 || bidAmount === null) {
      setErrorMessage("Bid amount is required");
      return false;
    }
    if (bidAmount <= auctionItem.current_bid_price) {
      setErrorMessage("Bid amount must be greater than current bid price");
      return false;
    }
    return true;
  };

  const onBidChange = (e: any) => {
    setBidAmount(e.target.value);

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  return (
    <div className={inter.className}>
      <Navbar />

      {showBidHistory && <BidHistoryModal onClose={toggleBidHistory} bidHistory={bidHistory} />}

      <div className={styles.container}>
        <div className={styles.image_container}>
          <Image src={auctionItem.image_url} alt="product_image" width={525} height={526} />
        </div>

        <section className={styles.info_section}>
          <h1>{auctionItem.name}</h1>
          <p className={styles.description}>{auctionItem.description}</p>

          <div className={styles.price}>${auctionItem.current_bid_price}</div>
          <div className={styles.time}>
            Time Remaining {<AuctionCountdown endTime={auctionItem.end_time} />}
          </div>

          <section className={styles.bid_section}>
            {auctionItem.auction_type === "forward" ? (
              <>
                <div className={styles.bid_container}>
                  <input
                    type="text"
                    name="bid"
                    placeholder="Enter Bid"
                    className={styles.bid_input}
                    value={bidAmount || ""}
                    onChange={onBidChange}
                  />
                  <button onClick={placeBid} className={styles.bid_button}>
                    Bid
                  </button>
                </div>

                <AsyncButton
                  isLoading={isBidHistoryLoading}
                  onClick={toggleBidHistory}
                  className={styles.bid_history_btn}
                >
                  <div>bid history</div>
                </AsyncButton>
              </>
            ) : (
              <AsyncButton
                isLoading={isDutchBidLoading}
                onClick={placeDutchBid}
                className={styles.bid_btn}
              >
                <div>bid</div>
              </AsyncButton>
            )}
          </section>
          <div className={styles.shipping_and_tax} onClick={NavigateToTerms}>
            Shipping & Tax
          </div>
          <label className={`${styles.error_label} ${errorMessage && styles.active}`}>
            {errorMessage || "Error occured while placing bid"}
          </label>
        </section>
      </div>
    </div>
  );
};

export default AuctionItemPage;
