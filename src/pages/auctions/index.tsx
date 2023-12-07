"use client";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import styles from "./styles/AuctionsPage.module.css";
import AuctionCard from "@/components/AuctionCard";
import { auctions } from "../api/auction_item_dummy_data";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useEffect } from "react";
import { searchCatalog, viewCatalog } from "../api/bidder/bidder-api";
import { AuctionItem } from "@/dto";
import { useWebSocket } from "@/contexts/wsContext";
import { LISTEN_FOR_BID_EVENT } from "../api/endpoints";
import { ListingResponse } from "../api/api-contracts/responses/Listing";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export interface ViewCatalogResponse {
  id: number;
  name: string;
  description: string;
  image_url: string;
  decrement_amount: number;
  auction_type: AuctionType;
  current_bid_price: number;
  end_time: string;
  listing_item_id: number;
  seller_id: number;
  starting_bid_price: number;
}

type AuctionType = "dutch" | "forward";

const AuctionsPage = () => {
  const router = useRouter();
  const { query } = router;

  const [auctionsLoading, setAuctionsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<ViewCatalogResponse[]>([]);

  const categories = ["Electronics", "Tools", "Toys"];

  const handleCategoryClick = (category: string) => {
    // const currentQuery = { ...query, category };
    // router.push({
    //   pathname: "/auctions",
    //   query: currentQuery,
    // });
    router.push(`/auctions?search=${category}`);
  };

  // const filteredAuctions = auctions.filter((auction) => {
  //     return (!query.category || auction.category === query.category) &&
  //            (!query.auction_type || auction.auctionType === query.auction_type);
  // })

  const handleFilter = async (keyword: string) => {
    let resp: any;

    try {
      setAuctionsLoading(true);
      resp = await searchCatalog(keyword);

      if (resp?.status === "failed") {
        alert("Error occured while searching for item. Please try again later.");
        return;
      }

      if (resp?.status === false) return;

      setSearchResults(resp?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setAuctionsLoading(false);
      handleCategoryClick(keyword);
    }
  };

  const handleItemSearch = async () => {
    let searchItem: string;

    if (typeof query.search !== "string") return;

    searchItem = query.search as string;

    let resp: any;

    try {
      setAuctionsLoading(true);
      resp = await searchCatalog(searchItem);

      if (resp?.status === "failed") {
        alert("Error occured while searching for item. Please try again later.");
        return;
      }

      if (resp?.status === false) return;

      setSearchResults(resp?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setAuctionsLoading(false);
    }
  };

  useEffect(() => {
    handleItemSearch();
  }, [query.search]);

  const getTitle = () => {
    if (query.auction_type) {
      return `${query.auction_type} Auctions`;
    } else if (query.category) {
      return `${query.category} Auctions`;
    } else if (query.search) {
      return `Search results for "${query.search}"`;
    } else {
      return "All Items";
    }
  };

  type AuctionType = "dutch" | "forward";

  const [auctionItems, setAuctionItems] = useState<ViewCatalogResponse[]>([]);

  const filteredAuctions = auctionItems?.filter((auction) => {
    return !query.auction_type || auction.auction_type === query.auction_type;
  });

  const { connectToSocket, disconnectSocket } = useWebSocket();

  useEffect(() => {
    const socket = connectToSocket();

    const fetchInitialBidItems = async () => {
      const response = await viewCatalog();

      setAuctionItems(response.data);
    };

    fetchInitialBidItems();

    socket?.on(LISTEN_FOR_BID_EVENT, (data) => {
      const { listing_item_id, bid_amount } = data.data.data;

      setAuctionItems((prevItems) =>
        prevItems.map((item) =>
          item.id === listing_item_id ? { ...item, currentPrice: bid_amount } : item
        )
      );
      console.log("listening for bid event", listing_item_id, bid_amount);
    });

    return () => {
      socket?.off(LISTEN_FOR_BID_EVENT);
      disconnectSocket();
    };
  }, [connectToSocket, disconnectSocket]);

  const getAuctionsBody = () => {
    if (filteredAuctions?.length === 0) {
      return (
        <div className={styles.no_auctions_container}>
          <h1>No Items being Auctioned</h1>
        </div>
      );
    }

    if (query.search) {
      if (searchResults?.length === 0) {
        return (
          <div className={styles.no_auctions_container}>
            <h1>No Results Found</h1>
          </div>
        );
      }

      return (
        <div className={styles.auctions_container}>
          {searchResults?.map((auction) => {
            return <AuctionCard key={auction.listing_item_id} auction={auction} />;
          })}
        </div>
      );
    }

    return (
      <div className={styles.auctions_container}>
        {filteredAuctions?.map((auction) => {
          return <AuctionCard key={auction.listing_item_id} auction={auction} />;
        })}
      </div>
    );
  };

  return (
    <div className={inter.className}>
      <Navbar />
      <div className={styles.container}>
        <section className={styles.filter_section}>
          <h2>Filters</h2>
          <ul>
            {categories.map((category, index) => (
              <li key={index} onClick={() => handleFilter(category)}>
                {category}
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.auctions_section}>
          <h1 style={{ textTransform: "capitalize" }}>{getTitle()}</h1>
          {getAuctionsBody()}
        </section>
      </div>
    </div>
  );
};

export default AuctionsPage;
