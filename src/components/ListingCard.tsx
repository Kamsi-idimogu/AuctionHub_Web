import { useRouter } from "next/router";
import { AuctionItem } from "@/dto";
import Image from "next/image";
import Button from "./Button";
import styles from "@/styles/ListingCard.module.css";
import AuctionCountdown from "./AuctionCountdown";
import { ListingResponse } from "@/pages/api/api-contracts/responses/Listing";
import { WatchListResponse } from "@/pages/account/profile";
import { startAuction } from "@/pages/api/seller/seller-api";
import { use, useEffect, useState } from "react";

interface ListingCardProps {
  auction: ListingResponse | WatchListResponse;
  backgroundColor?: string;
  wantTime?: boolean;
}
const ListingCard = ({ auction, backgroundColor, wantTime = true }: ListingCardProps) => {
  const router = useRouter();
  const [color, setColor] = useState<string | undefined>(backgroundColor);

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

  const handleSelect = () => {
    if (auction.listing_item_id) {
      router.push(`/auctions/${auction.listing_item_id}`);
    } else {
      const list = auction as WatchListResponse;
      router.push(`/auctions/${list.listing_item_id}`);
    }
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  // 2 hours from now in epoch
  // const time = Date.now() + 7200000;
  // const time = 1701661069578;
  const time = auction.end_time;

  const [isDraft, setIsDraft] = useState<boolean>(auction.status === "draft");

  const handleUpload = async () => {
    const watchlistItem = auction as WatchListResponse;
    const resp: any = await startAuction(watchlistItem.listing_item_id);
    if (resp === undefined) {
      alert("Something went wrong. Please try again later");
      return;
    }
    if (resp.status === "failed") {
      alert("Error starting auction. Please try again later.");
      return;
    }

    setIsDraft(false);
    setColor(getCardBackgroundColor("ongoing"));

    router.push(`/account/profile`);
  };

  const goToEditPage = () => {
    router.push(`/auctions/create-a-listing/${auction.listing_item_id}`);
    // console.log("listing id: ", auction.listing_item_id);
  };

  const truncatedDescription = truncateText(auction.description, 20);

  return (
    <div className={styles.auction_card} style={{ backgroundColor: color }}>
      <div className={styles.auction_image}>
        <Image src={auction.image_url} alt="product_image" width={260} height={227} />
      </div>
      <div className={styles.auction_info}>
        <div className={styles.auction_title_and_price}>
          <h3>{auction.name}</h3>
          <h3 style={{ color: "#FF5454" }}>${auction.current_bid_price}</h3>
        </div>
        <div className={styles.auction_description}>
          <p className={styles.auction_description_text}>{truncatedDescription}</p>

          <p>
            Auction Type:{" "}
            <span style={{ textTransform: "capitalize" }}>{auction.auction_type}</span>
          </p>
        </div>
        <div className={styles.auction_time_and_bid}>
          {!isDraft ? (
            <div className={styles.auction_buttons}>
              <Button onClick={handleSelect} className={styles.select_btn}>
                <div>select</div>
              </Button>
            </div>
          ) : (
            <div className={styles.auction_buttons}>
              <Button onClick={handleUpload} className={styles.select_btn}>
                <div>upload</div>
              </Button>
              <Button onClick={goToEditPage} className={styles.watchlist_btn}>
                <div>edit</div>
              </Button>
            </div>
          )}
          <p style={wantTime ? { visibility: "visible" } : { visibility: "hidden" }}>
            Remaining Time:{" "}
            <span style={{ color: "#FF5454" }}>
              <AuctionCountdown endTime={time.toString()} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
