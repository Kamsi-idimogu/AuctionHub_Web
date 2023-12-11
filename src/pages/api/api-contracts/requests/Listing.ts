export type ListingRequest = {
  name: string;
  description: string;
  image: File | null;
  keyword1: string;
  keyword2: string;
  keyword3: string;
  auctionType: AuctionType;
  starting_bid_price: number | undefined;
  decrement_amount: number | undefined;
  end_time: string;
};

type AuctionType = "dutch" | "forward";
