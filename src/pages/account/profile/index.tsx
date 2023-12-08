import React, { useEffect, useState } from "react";
import styles from "./styles/ProfilePage.module.css";
import Navbar from "@/components/Navbar";
import ListingCard from "@/components/ListingCard";
import { BiEditAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import ProtectedComponent from "@/components/ProtectedComponent";
import CreateListingCard from "@/components/CreateListingCard";
import { useAuthStore } from "@/store/authStore";
import { LISTEN_FOR_BID_EVENT } from "@/pages/api/endpoints";
import { User } from "@/dto";
import { viewListing } from "@/pages/api/seller/seller-api";
import { useWebSocket } from "@/contexts/wsContext";
import { ListingResponse } from "@/pages/api/api-contracts/responses/Listing";
import { viewWatchList } from "@/pages/api/bidder/bidder-api";

export interface WatchListResponse {
  id: number;
  name: string;
  description: string;
  image_url: string;
  decrement_amount: number;
  auctionType: AuctionType;
  current_bid_price: number;
  end_time: string;
  listing_item_id: number;
  seller_id: number;
  starting_bid_price: number;
  status: AuctionStatus;
  has_been_sold: boolean;
}

type AuctionType = "dutch" | "forward";

type AuctionStatus = "highest bidder" | "outbid" | "watching";

const Profile: React.FC = () => {
  const router = useRouter();

  const navigateToEditItem = (profileItem: string) => {
    router.push(`/account/edit/${profileItem}`);
  };

  const [profile, setProfile] = useState<User | null>(null);

  const { user } = useAuthStore();

  useEffect(() => {
    if (!profile) {
      if (user) setProfile(user);
    }
  }, [user]);

  const CardGroupTitle = profile?.role === "seller" ? "Your Listings" : "Watchlist";

  const CardGroupLegend =
    profile?.role === "seller"
      ? [
          { name: "Draft", color: "#B6CDE8" },
          { name: "Ongoing", color: "#B6E8B8" },
          { name: "Sold", color: "#E8B6B6" },
          { name: "Expired", color: "#EEEFA7" },
        ]
      : [
          { name: "Watching", color: "#B6CDE8" },
          { name: "Highest Bidder", color: "#B6E8B8" },
          { name: "Outbid", color: "#E8B6B6" },
          { name: "Won", color: "#EEEFA7" },
        ];
  
  const SellerGroupLegend = [
    { name: "Draft", color: "#B6CDE8" },
    { name: "Ongoing", color: "#B6E8B8" },
    { name: "Sold", color: "#E8B6B6" },
    { name: "Expired", color: "#EEEFA7" },
  ];

  const BidderGroupLegend = [
    { name: "Watching", color: "#B6CDE8" },
    { name: "Highest Bidder", color: "#B6E8B8" },
    { name: "Outbid", color: "#E8B6B6" },
    { name: "Won", color: "#EEEFA7" },
  ];

  const getCardBackgroundColor = (status: string) => {
    switch (status) {
      case "draft" || "watching":
        return "#B6CDE8";
      case "ongoing" || "highest bidder":
        return "#B6E8B8";
      case "sold" || "won":
        return "#E8B6B6";
      case "expired" || "outbid":
        return "#EEEFA7";
      default:
        return "#FFFFFF";
    }
  };

  const [listingItems, setListingItems] = useState<ListingResponse[]>([]);
  const [watchListItems, setWatchListItems] = useState<WatchListResponse[]>([]);

  const { connectToSocket, disconnectSocket } = useWebSocket();

  useEffect(() => {
    const socket = connectToSocket();

    const fetchInitialBidItems = async () => {
      const response = await viewListing();

      setListingItems(response.data);
    };

    fetchInitialBidItems();

    const fetchInitialWatchListItems = async () => {
      const response = await viewWatchList();

      setWatchListItems(response.data);
    };

    fetchInitialWatchListItems();

    socket?.on(LISTEN_FOR_BID_EVENT, (data) => {
      const { listing_item_id, current_bid_price } = data?.data;

      const bid_amount = current_bid_price;

      if (profile?.role === "seller") {
        setListingItems((prevItems) =>
          prevItems.map((item) =>
            item.listing_item_id === listing_item_id ? { ...item, currentPrice: bid_amount } : item
          )
        );
      } 
      // else {
        setWatchListItems((prevItems) =>
          prevItems.map((item) =>
            item.id === listing_item_id ? { ...item, currentPrice: bid_amount } : item
          )
        );
      // }

      console.log("listening for bid event", listing_item_id, bid_amount);
    });

    return () => {
      socket?.off(LISTEN_FOR_BID_EVENT);
      disconnectSocket();
    };
  }, [connectToSocket, disconnectSocket, profile?.role]);

  const WatchlistComponents = () => {
    if (watchListItems === undefined || watchListItems === null || watchListItems.length === 0) {
      return <h3 className={styles.info_subheading}>You have no items in your watchlist</h3>;
    }

    return (
      <div className={styles.watchlistContainer}>
        {watchListItems.map((item) => (
          <ListingCard
            key={item.listing_item_id}
            auction={item}
            backgroundColor={getCardBackgroundColor(item.status)}
          />
        ))}
      </div>
    );
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedComponent>
      <div className={styles.profileContainer}>
        <Navbar />
        <h2>Your Profile</h2>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <span className={styles.gridItemTitle}>First Name</span>
            <div className={styles.itemContainer}>
              <span className={styles.gridItemText}>{profile.first_name}</span>
              <BiEditAlt
                className={styles.editIcon}
                onClick={() => navigateToEditItem("first_name")}
              />
            </div>
          </div>
          <div className={styles.gridItem}>
            <span className={styles.gridItemTitle}>Last Name</span>
            <div className={styles.itemContainer}>
              <span className={styles.gridItemText}>{profile.last_name}</span>
              <BiEditAlt
                className={styles.editIcon}
                onClick={() => navigateToEditItem("last_name")}
              />
            </div>
          </div>
          <div className={styles.gridItem}>
            <span className={styles.gridItemTitle}>Username</span>
            <div className={styles.itemContainer}>
              <span className={styles.gridItemText}>{profile.username}</span>
            </div>
          </div>
          <div className={styles.gridItem}>
            <span className={styles.gridItemTitle}>Password</span>
            <div className={styles.itemContainer}>
              <span className={styles.gridItemText}>{profile.password}</span>
              <BiEditAlt
                className={styles.editIcon}
                onClick={() => navigateToEditItem("password")}
              />
            </div>
          </div>
          <div className={styles.gridItemSingle}>
            <span className={styles.gridItemTitle}>Email</span>
            <div className={styles.itemContainer}>
              <span className={styles.gridItemText}>{profile.email}</span>
            </div>
          </div>

          <div className={styles.gridItem}>
            <span className={styles.gridItemTitle}>Street Number</span>
            <div className={styles.itemContainer}>
              <span className={styles.gridItemText}>{profile.street_number}</span>
              <BiEditAlt
                className={styles.editIcon}
                onClick={() => navigateToEditItem("street_number")}
              />
            </div>
          </div>
          <div className={styles.gridItem}>
            <span className={styles.gridItemTitle}>Street Name</span>
            <div className={styles.itemContainer}>
              <span className={styles.gridItemText}>{profile.street_name}</span>
              <BiEditAlt
                className={styles.editIcon}
                onClick={() => navigateToEditItem("street_name")}
              />
            </div>
          </div>
          <div className={styles.gridItem}>
            <span className={styles.gridItemTitle}>Country</span>
            <div className={styles.itemContainer}>
              <span className={styles.gridItemText}>{profile.country}</span>
              <BiEditAlt
                className={styles.editIcon}
                onClick={() => navigateToEditItem("country")}
              />
            </div>
          </div>
          <div className={styles.gridItem}>
            <span className={styles.gridItemTitle}>City</span>
            <div className={styles.itemContainer}>
              <span className={styles.gridItemText}>{profile.city}</span>
              <BiEditAlt className={styles.editIcon} onClick={() => navigateToEditItem("city")} />
            </div>
          </div>
        </div>

        { profile?.role === "seller" && (
          <>
          <div className={styles.watchlistTitle}>
            <h3>Your Listings</h3>
            <div className={styles.watchlistLegend}>
              {SellerGroupLegend.map((legendItem, index) => (
                <span className={styles.watchlistLegendItem} key={index}>
                  <div
                    className={styles.watchlistLegendColor}
                    style={{ backgroundColor: legendItem.color }}
                  />
                  <span className={styles.watchlistLegendText}>{legendItem.name}</span>
                </span>
              ))}
            </div>
          </div>
        <div className={styles.watchlistContainer}>
          {listingItems?.map((item) => (
                <ListingCard
                  key={item.listing_item_id}
                  auction={item}
                  backgroundColor={getCardBackgroundColor(item.status)}
                  wantTime={item.status !== "sold" && item.status !== "expired"}
                />
           ))}
          <CreateListingCard />
        </div>
        </>
        )}
        <div className={styles.watchlistTitle}>
          <h3>Watchlist</h3>
          <div className={styles.watchlistLegend}>
            {BidderGroupLegend.map((legendItem, index) => (
              <span className={styles.watchlistLegendItem} key={index}>
                <div
                  className={styles.watchlistLegendColor}
                  style={{ backgroundColor: legendItem.color }}
                />
                <span className={styles.watchlistLegendText}>{legendItem.name}</span>
              </span>
            ))}
          </div>
        </div>
        { WatchlistComponents() }
        
      </div>
    </ProtectedComponent>
  );
};

export default Profile;
