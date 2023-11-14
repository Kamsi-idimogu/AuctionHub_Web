import { useRouter } from "next/router";
import AuctionItemPage from "./components/AuctionItemPage";

const AuctionPage = () => {
    const router = useRouter();
    const { auction_id } = router.query;

    return (
        <AuctionItemPage />
    )
}

export default AuctionPage
