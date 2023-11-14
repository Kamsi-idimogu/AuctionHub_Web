import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import styles from "./styles/AuctionsPage.module.css"
import AuctionCard from "@/components/AuctionCard"
import { auctions } from "../api/auction_item_dummy_data"

const inter = Inter({ subsets: ['latin'], weight: ["400", "500", "600", "700", "800", "900"] })

const AuctionsPage = () => {

    const categories = [
        "Electronics",
        "Tools",
        "Toys"
    ]

    return (
        <div className={inter.className}>
            <Navbar />
            <div className={styles.container}>
                <section className={styles.filter_section}>
                    <h2>Filters</h2>
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))}
                    </ul>
                </section>
                <section className={styles.auctions_section}>
                    <h1>All Items</h1>
                    <div className={styles.auctions_container}>
                        {auctions.map((auction) => {
                            return (
                                <AuctionCard key={auction.id} auction={auction} />
                            )
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AuctionsPage
