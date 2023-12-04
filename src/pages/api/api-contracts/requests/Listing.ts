export type ListingRequest = {
    name: string;
    description: string;
    image: string;
    keyword1: string;
    keyword2: string;
    keyword3: string;
    auctionType: AuctionType;
    starting_bid_price: number;
    decrement_amount: number;
    end_time: string;
}

type AuctionType = "dutch" | "forward";
