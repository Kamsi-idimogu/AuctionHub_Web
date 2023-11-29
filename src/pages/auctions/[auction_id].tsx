import { useRouter } from "next/router";
import AuctionItemPage from "./components/AuctionItemPage";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'], weight: ["400", "500", "600", "700", "800", "900"] })

const AuctionPage = () => {
    const router = useRouter();
    const { auction_id } = router.query;

    return (
        <div className={inter.className}>
            <AuctionItemPage />
        </div>
    )
}

export default AuctionPage
