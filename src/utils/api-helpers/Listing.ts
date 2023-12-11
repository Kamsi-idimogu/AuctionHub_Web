import { AuctionItem } from "@/dto";
import { ListingRequest } from "@/pages/api/api-contracts/requests/Listing";
import { ListingResponse } from "@/pages/api/api-contracts/responses/Listing";

export const ObtainListingObject = (data: any): ListingResponse => {
  return {
    id: data.listing_item_id,
    name: data.name,
    description: data.description,
    image_name: data.image_name,
    image_url: data.image_url,
    auction_type: data.auctionType,
    status: data.status,
    currentPrice: data.current_bid_price,
    end_time: data.end_time,
  };
};

// export const CreateListingRequest = (formData: AuctionItem): ListingRequest => {
//     return {
//         name: formData.name,
//         description: formData.description,
//         image: formData,
//         keyword1: formData.keyword1 || "",
//         keyword2: formData.keyword2 || "",
//         keyword3: formData.keyword3 || "",
//         auctionType: convertAuctionType(formData.auctionType || ""),
//         starting_bid_price: formData.startingPrice,
//         decrement_amount: formData.d,
//         end_time: formData.d,
//     };

// };

const convertAuctionType = (auctionType: string): "dutch" | "forward" => {
  switch (auctionType) {
    case "Dutch":
      return "dutch";
    case "Forward":
      return "forward";
    default:
      return "forward";
  }
};
