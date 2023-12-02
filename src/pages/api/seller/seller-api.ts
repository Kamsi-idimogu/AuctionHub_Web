import axios from "axios";
import {
  CREATE_LISTING_ENDPOINT,
  START_AUCTION_ENDPOINT,
  VIEW_LISTING_ENDPOINT,
} from "../endpoints";
import { errorHandler } from "../error_handler";

export const createListing = async (formData: any): Promise<payload> => {
  try {
    const listingPayload = {
      name: formData.name,
      description: formData.description,
      image: formData.imageUrl,
      keyword1: formData.category1,
      keyword2: formData.category2,
      keyword3: formData.category3,
      auctionType: formData.auctionType,
      starting_bid_price: formData.startingPrice,
      decrement_amount: formData.decrementValue,
      end_time: formData.auctionEndTime,
    };

    const resp = await axios.post(CREATE_LISTING_ENDPOINT, { ...listingPayload });

    console.log("response:", resp);

    return {
      status: resp.data.status || "success",
      message: resp.data.message,
      data: resp.data.data,
    };
  } catch (error: any) {
    console.log("error:", error);
    return errorHandler(error);
  }
};

export const viewListing = async (): Promise<payload> => {
  try {
    const resp = await axios.get(VIEW_LISTING_ENDPOINT);

    console.log("response:", resp);

    return {
      status: resp.data.status || "success",
      message: resp.data.message,
      data: resp.data.data,
    };
  } catch (error: any) {
    console.log("error:", error);
    return errorHandler(error);
  }
};

export const startAuction = async (listing_item_id: number): Promise<payload> => {
  try {
    const resp = await axios.post(START_AUCTION_ENDPOINT + "/" + listing_item_id);

    console.log("response:", resp);

    return {
      status: resp.data.status || "success",
      message: resp.data.message,
      data: resp.data.data,
    };
  } catch (error: any) {
    console.log("error:", error);
    return errorHandler(error);
  }
};
