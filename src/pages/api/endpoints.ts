export const BASE_HTTP_URL = "https://127.0.0.1:7080/api-gateway";

export const BASE_WS_URL = "ws://127.0.0.1:7081";

export const REGISTER_ENDPOINT = `${BASE_HTTP_URL}/register`;

export const LOGIN_ENPOINT = `${BASE_HTTP_URL}/login`;

export const LOGOUT_ENDPOINT = `${BASE_HTTP_URL}/logout`;

export const CREATE_LISTING_ENDPOINT = `${BASE_HTTP_URL}/create-listing`;

export const VIEW_LISTING_ENDPOINT = `${BASE_HTTP_URL}/view-listing`;

export const START_AUCTION_ENDPOINT = `${BASE_HTTP_URL}/start-auction`;

export const VIEW_CATALOGUE_ENDPOINT = `${BASE_HTTP_URL}/catalog`;

export const SEARCH_CATALOGUE_ENDPOINT = `${BASE_HTTP_URL}/search-catalog`;

export const EDIT_USER_PROFILE_ENDPOINT = `${BASE_HTTP_URL}/edit-profile`;

export const VIEW_WATCHLIST_ENDPOINT = `${BASE_HTTP_URL}/view-watchlist`;

export const CHECKOUT_ENDPOINT = `${BASE_HTTP_URL}/checkout`;

export const VIEW_BIDDING_HISTORY_ENDPOINT = `${BASE_HTTP_URL}/view-bidding-history`;

export const BID_ENPOINT = `${BASE_WS_URL}/bid`;

export const PLACE_BID_EVENT = "place-bid";

export const LISTEN_FOR_BID_EVENT = "bid";

export const LISTEN_FOR_EXCEPTION_EVENT = "exception";

export const LISTEN_FOR_BID_ERROR_EVENT = "bidError";

export const LISTEN_FOR_DECREMENT_BID_EVENT = "decrementBidPrice";
