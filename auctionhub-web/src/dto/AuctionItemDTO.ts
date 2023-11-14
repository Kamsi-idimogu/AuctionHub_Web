export type AuctionItem = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    startingPrice?: number;
    reservePrice?: number;
    currentPrice?: number;
    auctionType: AuctionType;
    auctionStartTime?: Date;
    auctionEndTime?: Date;
    auctionStatus?: AuctionStatus;
}

export type AuctionType =  "Dutch" | "Forward";

export type AuctionStatus = "Open" | "Closed" | "Cancelled";
