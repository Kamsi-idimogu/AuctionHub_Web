export type WatchListResponse = {
    id: number;
    name: string;
    description: string;
    listing_item_id: number;
    seller_id: number;
    end_time: string;
    starting_bid_price: number;
    current_bid_price: number;
    decrement_amount: number;
    image_url: string;
    auction_type: string;
    has_been_sold: boolean;
    status: string;
}
