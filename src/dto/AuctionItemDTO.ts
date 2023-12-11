export type AuctionItem = {
  id: string;
  listing_item_id: string;
  name: string;
  description: string;
  imageUrl: string;
  startingPrice: number | undefined;
  currentPrice: number;
  auction_type: AuctionType | undefined;
  auctionStartTime?: Date;
  auctionEndTime?: Date;
  auctionStatus?: AuctionStatus;
  keyword1?: string;
  keyword2?: string;
  keyword3?: string;
};

export type AuctionType = "Dutch" | "Forward" | "Unset";

export type AuctionStatus = "Ongoing" | "Sold" | "Draft";

export type ListingItem = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  auction_type: AuctionType;
  status: AuctionStatus;
  currentPrice: number;
  auctionEndTime: string;
};
