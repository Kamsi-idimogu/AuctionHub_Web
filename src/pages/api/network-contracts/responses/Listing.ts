export type ListingResponse = {
    id: number;
    name: string;
    description: string;
    image_name: string;
    image_url: string;
    auctionType: AuctionType;
    status: AuctionStatus;
    currentPrice: number;
    end_time: string;
}

type AuctionType = "dutch" | "forward";

type AuctionStatus = "ongoing" | "closed" | "draft";