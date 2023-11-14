import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import styles from './styles/LandingPage.module.css';
import AuctionCard from '@/components/AuctionCard';
import { auctions } from '../api/auction_item_dummy_data';

const LandingPage = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    
    const handleAuctionButtonClick = () => {
        if (isUserLoggedIn) {
            window.location.href = "/auctions";
        } else {
            window.location.href = "/login";       
        }
    }

    const goToRegisterPage = () => {
        window.location.href = "/register";
    }

    return (
        <div >
            <Navbar />
            <section className={styles.hero_section}>
                <div className={styles.hero_text}>
                    <h1>Welcome to Auction Hub</h1>
                    <p>Your one stop shop for amazing finds and exciting auctions!</p>
                    <Button onClick={handleAuctionButtonClick} className={styles.hero_btn}><div>start bidding now</div></Button>
                </div>
                <div className={styles.hero_image}>
                    <Image src={"/images/hero-image.png"} alt='hero_image' width={661} height={495} />
                </div>
            </section>
            <section className={styles.featured_section}>
                <h1>Current Auctions</h1>
                <div className={styles.featured_auctions}>
                    {auctions.slice(0, 4).map((auction) => {
                        return (
                            <AuctionCard key={auction.id} auction={auction} />
                        )
                    })}
                </div>
                <Button onClick={handleAuctionButtonClick} className={styles.featured_btn}><div>view more</div></Button>
            </section>
            <section className={styles.info_section}>
                <h1>How Does it Work?</h1>
                <h3>Step 1: Register</h3>
                <p>Before you can bid, you'll need to create an account. 
                    Registration is a straightforward process that requires 
                    you to provide some basic information
                </p>
                <Button onClick={goToRegisterPage} className={styles.info_btn}><div>join now</div></Button>
                <h3>Step 2: Explore</h3>
                <p>Explore our vast selection of auctions. We offer a diverse range 
                    of items, from electronics and collectibles to fashion and
                    home goods.
                </p>
                <h3>Step 3: Bid</h3>
                <p>There are two types of auctions: Forward and Dutch</p>
                <div className={styles.info_auctions}>
                    <div className={styles.forward_auction}>
                        <h3>Forward Auctions</h3>
                        <ul>
                            <li>Seller sets an initial price, and bids must be higher</li>
                            <li>Bidders can see current highest bid and remaining time</li>
                            <li>Last highest bidder wins and pays that amount</li>
                            <li>Item removed if no bids after a fixed income</li>
                        </ul>
                    </div>
                    <div className={styles.dutch_auction}>
                        <h3>Dutch Auctions</h3>
                        <ul>
                            <li>Seller starts with a high asking price</li>
                            <li>Lowers price until a bidder accepts or reserved price is reached</li>
                            <li>Bidders can't see others' bids and can't adjust their own</li>
                            <li>An item is removed if there are no buyers after the lowest price or fixed time is reached</li>
                        </ul>
                    </div>
                </div>
                <h3>Step 4: Compete</h3>
                <p>
                    Actively compete with each other to secure the winnig bid.
                    There are Real-time updates, allowing participants to adjust
                    their bids accordingly.
                </p>
                <h3>Step 5: Win and Payment</h3>
                <p>
                    When the auction timer runs out and you have the highest bid,
                    congratulations! You've won the auction.
                </p>
                <Button onClick={handleAuctionButtonClick} className={styles.info_btn}><div>start bidding now</div></Button>
            </section>
        </div>
    )
}

export default LandingPage
