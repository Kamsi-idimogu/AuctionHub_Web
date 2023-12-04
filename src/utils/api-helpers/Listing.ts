import { ListingResponse } from "@/pages/api/network-contracts/responses/Listing";

export const ObtainListingObject = (data: any): ListingResponse => {
    return {
        id: data.listing_item_id,
        name: data.name,
        description: data.description,
        image_name: data.image_name,
        image_url: data.image_url,
        auctionType: data.auctionType,
        status: data.status,
        currentPrice: data.current_bid_price,
        end_time: data.end_time,
    };
};
