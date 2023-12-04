import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auctions } from '@/pages/api/auction_item_dummy_data';
import { AuctionItem } from '@/dto';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import styles from './AuctionItemPage.module.css'
import Button from '@/components/Button';
import BidHistoryModal from './BidHistoryModal';
import { EpochToDateTime } from '@/utils/dateTime';
import AsyncButton from '@/components/AsyncButton';
import { viewBiddingHistory } from '@/pages/api/bidder/bidder-api';
import AuctionCountdown from '@/components/AuctionCountdown';

const inter = Inter({ subsets: ['latin'], weight: ["400", "500", "600", "700", "800", "900"] })

const AuctionItemPage = () => {
    const router = useRouter();
    const { auction_id } = router.query;
    const [auctionItem, setAuctionItem] = useState<AuctionItem>(auctions[1]);
    const [showBidHistory, setShowBidHistory] = useState<boolean>(false);
    const [isBidHistoryLoading, setIsBidHistoryLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("")

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

            // setBidHistory(resp?.data)
            setShowBidHistory(true);
        }
        catch (error) {
            console.log(error);
            setErrorMessage("Error occured while fetching bid history. Please try again later.")
        }
        finally {
            setIsBidHistoryLoading(false);
        }
        
    }

    useEffect(() => {
        if (auction_id) {
            const auction = auctions.find((auction) => auction.id === auction_id);
            if (auction)
                setAuctionItem(auction);
        }
    }, [auction_id]);

    const [bidHistory, setBidHistory] = useState([
        {bidder: "Ken Carson", bid: 135, time: "14:45:34"},
        {bidder: "Jack Frost", bid: 130, time: "14:40:12"},
        {bidder: "Ken Carson", bid: 120, time: "14:35:30"},
        {bidder: "Ryan", bid: 105, time: "14:34:50"},
        {bidder: "John Doe", bid: 100, time: "14:34:34"},
    ]);

    const NavigateToTerms = () => {
        router.push(`/terms-and-conditions`)
    }

    const time =  1701834593247;

    return (
        <div className={inter.className}>
            <Navbar />

            {showBidHistory && (
                <BidHistoryModal onClose={toggleBidHistory} bidHistory={bidHistory} />
            )}

            <div className={styles.container}>
                <div className={styles.image_container}>
                    <Image src={auctionItem.imageUrl} alt='product_image' width={525} height={526} />
                </div>
            
                <section className={styles.info_section}>
                    <h1>{auctionItem.name}</h1>
                    <p className={styles.description}>{auctionItem.description}</p>

                    <div className={styles.price}>${auctionItem.currentPrice}</div>
                    {auctionItem.auctionType === "Forward" && <div className={styles.time}>Time Remaining {<AuctionCountdown endTime={time.toString()} />}</div> }

                    <section className={styles.bid_section}>
                        <div className={styles.bid_container}>
                            <input type="text" name="bid" placeholder="Enter Bid" className={styles.bid_input}/>
                            <button type="submit" className={styles.bid_button}>Bid</button>
                        </div>

                        <AsyncButton isLoading={isBidHistoryLoading} onClick={toggleBidHistory} className={styles.bid_history_btn}><div>bid history</div></AsyncButton>
                    </section>
                    <div className={styles.shipping_and_tax} onClick={NavigateToTerms}>Shipping & Tax</div>
                    <label className={`${styles.error_label} ${errorMessage && styles.active}`}>{errorMessage || "Error occured while placing bid"}</label>
                </section>
            </div>
        </div>
    )

}

export default AuctionItemPage;
