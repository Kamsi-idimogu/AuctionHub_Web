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
    keyword1?: string;
    keyword2?: string;
    keyword3?: string;
}

export type AuctionType =  "Dutch" | "Forward" | "Unset";

export type AuctionStatus = "Ongoing" | "Closed" | "Draft";

export type ListingItem = {
    id: string;
    name: string;
    description: string;
    image_url: string;
    auctionType: AuctionType;
    status: AuctionStatus;
    currentPrice: number;
    auctionEndTime: string;
}
