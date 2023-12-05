import React, { use, useEffect, useState } from "react";
import styles from "./styles/ProfilePage.module.css";
import Navbar from "@/components/Navbar";
import ListingCard from "@/components/ListingCard";
import { BiEditAlt } from "react-icons/bi";
import { auctions } from "../../api/auction_item_dummy_data";
import { useRouter } from "next/router";
import { formatUserAddress } from "@/utils/userAddress";
import ProtectedComponent from "@/components/ProtectedComponent";
import CreateListingCard from "@/components/CreateListingCard";

// Placeholder user data - Replace with actual user data from state, props, or API
import { user as dummy_user } from "@/pages/api/user_dummy_data";
import { useAuthStore } from "@/store/authStore";
import { Socket, io } from "socket.io-client";
import {
  BID_ENPOINT,
  LISTEN_FOR_BID_ERROR_EVENT,
  LISTEN_FOR_BID_EVENT,
  LISTEN_FOR_DECREMENT_BID_EVENT,
  LISTEN_FOR_EXCEPTION_EVENT,
  PLACE_BID_EVENT,
} from "@/pages/api/endpoints";
import { AuctionItem, User } from "@/dto";
import axios from "axios";
import { viewListing } from "@/pages/api/seller/seller-api";
// import { getSocket } from "@/websocket/websocket";
import { useWebSocket } from "@/contexts/wsContext";
import { ListingResponse } from "@/pages/api/api-contracts/responses/Listing";

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

  const getUserListings = async () => {};

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

  const { socket, connectToSocket, disconnectSocket } = useWebSocket();

  useEffect(() => {
    connectToSocket();

    const fetchInitialBidItems = async () => {
      const response = await viewListing();

      setListingItems(response.data);
    };

    fetchInitialBidItems();

    socket?.on(LISTEN_FOR_BID_EVENT, (data) => {
      // Data should contain the item ID and the new bid amount
      const { listing_item_id, bid_amount } = data.data;

      // Update the bid item with the new bid
      setListingItems((prevItems) =>
        prevItems.map((item) =>
          item.id === listing_item_id ? { ...item, currentPrice: bid_amount } : item
        )
      );
      console.log("listening for bid event");
    });

    return () => {
      socket?.off(LISTEN_FOR_BID_EVENT);
      disconnectSocket();
    };
  }, []);

  function placeBid() {
    const bidData = {
      listing_item_id: 1,
      bid_amount: 350,
      bidder_id: 1,
    };
    console.log("Placing bid");

    socket?.emit(PLACE_BID_EVENT, bidData);
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
              <BiEditAlt
                className={styles.editIcon}
                onClick={() => navigateToEditItem("username")}
              />
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
              <BiEditAlt className={styles.editIcon} onClick={() => navigateToEditItem("email")} />
            </div>
          </div>
          {/* <div className={styles.gridItemSingle}>
            <span className={styles.gridItemTitle}>Address</span>
            <div className={styles.itemContainer}>
              <span className={styles.gridItemText}>{formatUserAddress(profile)}</span>
              <BiEditAlt
                className={styles.editIcon}
                onClick={() => navigateToEditItem("address")}
              />
            </div>
          </div> */}
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
        <div className={styles.watchlistTitle}>
          <h3>{CardGroupTitle}</h3>
          <div className={styles.watchlistLegend}>
            {CardGroupLegend.map((legendItem, index) => (
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
          {listingItems.map((item) => (
            <ListingCard
              key={item.id}
              auction={item}
              backgroundColor={getCardBackgroundColor(item.status || "")}
            />
          ))}
          {/* <ListingCard auction={auctions[0]} backgroundColor="#B6CDE8" />
          <ListingCard auction={auctions[0]} backgroundColor="#B6E8B8" />
          <ListingCard
            auction={auctions[0]}
            backgroundColor={getCardBackgroundColor(auctions[0].auctionStatus || "")}
          />
          <ListingCard auction={auctions[0]} backgroundColor="#E8B6B6" /> */}
          <CreateListingCard />
        </div>
      </div>
    </ProtectedComponent>
  );
};

export default Profile;
