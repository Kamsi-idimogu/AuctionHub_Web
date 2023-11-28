import { useRouter } from "next/router";
import CreateListing from "./components/CreateListing";

const AuctionPage = () => {
    const router = useRouter();
    const { auction_id } = router.query;

    return (
        <CreateListing editAuctionId={auction_id || ""}/>
    )
}

export default AuctionPage