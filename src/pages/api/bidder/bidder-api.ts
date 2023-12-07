import axios from "axios";
import { errorHandler } from "../error_handler";
import {
  BASE_WS_URL,
  SEARCH_CATALOGUE_ENDPOINT,
  VIEW_BIDDING_HISTORY_ENDPOINT,
  VIEW_CATALOGUE_ENDPOINT,
  VIEW_WATCHLIST_ENDPOINT,
} from "../endpoints";

export const viewCatalog = async (): Promise<payload> => {
  try {
    const resp = await axios.get(VIEW_CATALOGUE_ENDPOINT, { withCredentials: true });

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

export const searchCatalog = async (searchTerm: string): Promise<payload> => {
  try {
    const resp = await axios.get(SEARCH_CATALOGUE_ENDPOINT + "?searchkeyword=" + searchTerm, {
      withCredentials: true,
    });

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

export const viewWatchList = async (): Promise<payload> => {
  try {
    const resp = await axios.get(VIEW_WATCHLIST_ENDPOINT, { withCredentials: true });

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

export const viewBiddingHistory = async (listing_item_id: number): Promise<payload> => {
  try {
    const resp = await axios.get(VIEW_BIDDING_HISTORY_ENDPOINT + "/" + listing_item_id, {
      withCredentials: true,
    });

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
