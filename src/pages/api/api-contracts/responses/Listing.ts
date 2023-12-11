export type ListingResponse = {
  // id: number;
  name: string;
  description: string;
  image_name: string;
  image_url: string;
  auction_type: AuctionType;
  status: AuctionStatus;
  current_bid_price: number;
  end_time: string;
  listing_item_id: number;
};

type AuctionType = "dutch" | "forward";

type AuctionStatus = "ongoing" | "sold" | "draft" | "expired" | "pending";
