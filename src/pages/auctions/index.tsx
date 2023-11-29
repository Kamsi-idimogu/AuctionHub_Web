"use client";
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import styles from "./styles/AuctionsPage.module.css"
import AuctionCard from "@/components/AuctionCard"
import { auctions } from "../api/auction_item_dummy_data"
import { useRouter } from "next/router"
import { useState } from "react"
import LoadingIndicator from "@/components/LoadingIndicator"

const inter = Inter({ subsets: ['latin'], weight: ["400", "500", "600", "700", "800", "900"] })

const AuctionsPage = () => {
    const router = useRouter()
    const { query } = router

    const [auctionsLoading, setAuctionsLoading] = useState<boolean>(false)

    const categories = [
        "Electronics",
        "Tools",
        "Toys"
    ]

    const handleCategoryClick = (category: string) => {
        const currentQuery = { ...query, category };
        router.push({
            pathname: '/auctions',
            query: currentQuery,
        });
    }

    // const filteredAuctions = auctions.filter((auction) => {
    //     return (!query.category || auction.category === query.category) &&
    //            (!query.auction_type || auction.auctionType === query.auction_type);
    // })

    const filteredAuctions = auctions.filter((auction) => {
        return (!query.auction_type || auction.auctionType === query.auction_type);
    })

    return (
        <div className={inter.className}>
            <Navbar />
            <div className={styles.container}>
                <section className={styles.filter_section}>
                    <h2>Filters</h2>
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index} onClick={() => handleCategoryClick(category)}>{category}</li>
                        ))}
                    </ul>
                </section>
                <section className={styles.auctions_section}>
                    <h1>{query.auction_type ? `${query.auction_type} Auctions` : "All Items"}</h1>
                    
                    {auctionsLoading ? (
                        <div className={styles.loading_container}>
                            <div className={styles.loading}><LoadingIndicator width={100} height={100}/> </div>
                        </div>
                    ) : (
                    <div className={styles.auctions_container}>
                        {filteredAuctions.map((auction) => {
                            return (
                                <AuctionCard key={auction.id} auction={auction} />
                            )
                        })}
                    </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default AuctionsPage
