"use client";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import styles from "../styles/CreateListing.module.css";
import Navbar from "@/components/Navbar";
import { AuctionItem } from "@/dto";
import { auctions } from "@/pages/api/auction_item_dummy_data";
// import { listings } from "@/pages/api/listing_dummy_data";
import router from "next/router";
import AsyncButton from "@/components/AsyncButton";
import { createListing, startAuction, viewListing } from "@/pages/api/seller/seller-api";
import ImageUpload from "./ImageUpload";
import { ListingRequest } from "@/pages/api/api-contracts/requests/Listing";
import { ListingResponse } from "@/pages/api/api-contracts/responses/Listing";
import { WatchListResponse } from "@/pages/account/profile";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

interface CreateListingProps {
  editAuctionId?: string | string[];
}

export interface ListingFormData {
  name: string;
  description: string;
  image: File | null;
  auctionType: string;
  keyword1: string;
  keyword2: string;
  keyword3: string;
  startingPrice: number | undefined;
  duration: number | undefined;
  decrementValue: number | undefined;
}
const CreateListing = ({ editAuctionId }: CreateListingProps) => {
  const [auctionItem, setAuctionItem] = useState<ListingResponse>({
    listing_item_id: 0,
    name: "",
    description: "",
    image_name: "",
    image_url: "",
    auctionType: "forward",
    status: "draft",
    current_bid_price: 0,
    end_time: "",
  });

  const [auctionImage, setAuctionImage] = useState<File | null>(null);

  const [formData, setFormData] = useState<ListingFormData>({
    name: "",
    description: "",
    image: null,
    auctionType: "",
    keyword1: "",
    keyword2: "",
    keyword3: "",
    startingPrice: undefined, // only for forward auctions
    duration: undefined, // only for dutch auctions
    decrementValue: undefined, // only for dutch auctions
  });

  const [listings, setListings] = useState<ListingResponse[]>([]);

  /**
   *   id: number;
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
   */

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    description: "",
    image: "",
    startingPrice: "",
    auctionType: "",
    duration: "",
    decrementValue: "",
    keyword1: "",
    keyword2: "",
    keyword3: "",
  });
  const [displayErrorMessage, setDisplayErrorMessage] = useState<string>("");

  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [isSaveDraftLoading, setIsSaveDraftLoading] = useState<boolean>(false);

  const findAuctionItem = (list: ListingResponse[], id: string) => {
    const listing = list.find((listing) => listing.listing_item_id === Number(id));
    console.log("listing: ", listing);
    if (listing) {
      setAuctionItem(listing);
    }
  };

  useEffect(() => {
    let resp: any;
    const getListings = async () => {
      resp = await viewListing();
      try {
        if (resp?.status === "failed") {
          alert("Error occured while fetching listings. Please try again later.");
          return;
        }

        if (resp?.status === false) return;

        if (typeof editAuctionId === "string") {
          const data = resp?.data as ListingResponse[];

          if (data) {
            findAuctionItem(resp?.data, editAuctionId);
          }
        }
        console.log("listings: ", resp);

        setListings(resp?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getListings();
  }, [editAuctionId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // clear error message when user starts typing
    setErrorMessages((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // clear error message when user starts typing
    setErrorMessages((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // clear error message when user starts typing
    setErrorMessages((prevState) => ({
      ...prevState,
      [name]: "",
    }));

    console.log(value);
  };

  const validateNumberInput = (input: string) => {
    // check if input is a whole number greater than 0
    const re = /^[1-9]\d*$/;
    return re.test(input);
  };

  const validateForm = () => {
    const newErrorMessages = {
      name: formData.name === "" ? "Name is required" : "",
      description: formData.description === "" ? "Description is required" : "",
      image: formData.image === null ? "Image Upload is required" : "",
      auctionType:
        formData.auctionType === "" || formData.auctionType === "Unset"
          ? "Auction Type is required"
          : "",
      keyword1:
        formData.keyword1 === "" || formData.keyword1 === "category" ? "Keyword 1 is required" : "",
      keyword2:
        formData.keyword2 === "" || formData.keyword2 === "category" ? "Keyword 2 is required" : "",
      keyword3:
        formData.keyword3 === "" || formData.keyword3 === "category" ? "Keyword 3 is required" : "",
      startingPrice:
        formData.auctionType === "Forward"
          ? formData.startingPrice === undefined
            ? "Starting Price is required"
            : validateNumberInput(new String(formData.startingPrice).toString())
            ? ""
            : "Starting Price must be a whole number greater than 0"
          : "",
      decrementValue:
        formData.auctionType === "Dutch"
          ? formData.decrementValue === undefined
            ? "Decrement Value is required"
            : validateNumberInput(new String(formData.decrementValue).toString())
            ? ""
            : "Decrement Value must be a whole number greater than 0"
          : "",
      duration:
        formData.duration === undefined
          ? "Duration is required"
          : validateNumberInput(new String(formData.duration).toString())
          ? ""
          : "Duration must be provided in hours and greater than 0",
    };

    setErrorMessages(newErrorMessages);

    // check if there are any error messages
    const anyErrors = Object.values(newErrorMessages).some((errorMessage) => errorMessage !== "");
    if (anyErrors) {
      // set display error message to first error message seen in the object
      const firstErrorMessage = Object.values(newErrorMessages).find(
        (errorMessage) => errorMessage !== ""
      );
      if (firstErrorMessage) {
        setDisplayErrorMessage(firstErrorMessage);
      }
    }

    return !anyErrors;
  };

  const clearAllData = () => {
    setFormData({
      name: "",
      description: "",
      image: null,
      auctionType: "",
      keyword1: "",
      keyword2: "",
      keyword3: "",
      startingPrice: 0,
      duration: undefined,
      decrementValue: 0,
    });
    setErrorMessages({
      name: "",
      description: "",
      image: "",
      startingPrice: "",
      auctionType: "",
      duration: "",
      decrementValue: "",
      keyword1: "",
      keyword2: "",
      keyword3: "",
    });
    setDisplayErrorMessage("");
  };

  const convertDurationToEpoch = (hours: string) => {
    const hoursInt = parseInt(hours);
    const epoch = new Date().getTime();
    const duration = hoursInt * 60 * 60 * 1000;
    return epoch + duration;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitLoading(true);
      let resp: any;

      try {
        formData.duration = convertDurationToEpoch(String(formData?.duration));

        resp = await createListing(formData);
        // call to server to get auction item by id
        // start the obtained auction
        console.log("resp: ", resp);

        if (resp === undefined) {
          alert("Something went wrong. Please try again later");
          return;
        }

        if (resp.status === "failed") {
          alert("Error creating listing. Please try again later.");
          return;
        }
        setTimeout(async () => {
          const listing = listings.find(
            (listing: any) => listing.name === formData.name.toLowerCase()
          ) as ListingResponse;

          console.log("listing: ", listings);

          if (listing === undefined) {
            alert("Something went wrong. Please try again later");
            return;
          }

          resp = await startAuction(listing.listing_item_id);

          if (resp === undefined) {
            alert("Something went wrong. Please try again later");
            return;
          }
          if (resp.status === "failed") {
            alert("Error starting auction. Please try again later.");
            return;
          }

          clearAllData();
          // router.push(`/account/profile`);
          window.location.href = `/account/profile`;
        }, 2000);
      } catch (error) {
        console.log(error);
        setDisplayErrorMessage("Server error occured. Please try again later");
      } finally {
        setIsSubmitLoading(false);
      }
    }
  };

  const handleSaveDraft = async () => {
    if (validateForm()) {
      setIsSaveDraftLoading(true);
      let resp: any;

      try {
        formData.duration = convertDurationToEpoch(String(formData?.duration));
        resp = await createListing(formData);
        if (resp === undefined) {
          alert("Something went wrong. Please try again later");
          return;
        }

        if (resp.status === "failed") {
          alert("Error creating listing. Please try again later.");
          return;
        }
        setTimeout(async () => {
          clearAllData();
          // router.push(`/account/profile`);
          window.location.href = `/account/profile`;
        }, 1000);
      } catch (error) {
        console.log(error);
        setDisplayErrorMessage("Server error occured. Please try again later");
      } finally {
        setIsSaveDraftLoading(false);
      }
    }
  };

  function submitImage(file: File, inputName?: string) {
    setAuctionImage(file);

    setFormData((prevState) => ({
      ...prevState,
      ["image"]: file,
    }));
  }
  return (
    <div className={inter.className}>
      <Navbar />
      <div className={styles.container}>
        <h1>Create a Listing</h1>
        <section className={styles.top_section}>
          <div className={styles.text_container}>
            <input
              type="text"
              name="name"
              placeholder="Add Title"
              className={`${styles.short_input} ${errorMessages.name && styles.error}`}
              value={auctionItem.name || formData.name}
              onChange={handleChange}
            />
            {/* <input type="text" name="startingPrice" placeholder="Starting Bid Price" className={`${styles.short_input} ${errorMessages.startingPrice && styles.error}`} value={auctionItem.startingPrice || formData.startingPrice} onChange={handleChange}/>                         */}
            <textarea
              name="description"
              placeholder="Description"
              className={`${styles.description_input} ${errorMessages.description && styles.error}`}
              value={auctionItem.description || formData.description}
              onChange={handleTextAreaChange}
            />
          </div>
          <div className={`${styles.image_container} ${errorMessages.image && styles.error}`}>
            {/* <div className={styles.image_placeholder} /> */}
            <ImageUpload onSubmit={submitImage} inputName="featured" />
          </div>
        </section>
        <section className={styles.bottom_section}>
          <div className={styles.dropdown_container}>
            <input
              type="text"
              name="keyword1"
              placeholder="Keyword 1"
              className={`${styles.short_input} ${errorMessages.name && styles.error}`}
              value={formData.keyword1}
              onChange={handleChange}
            />
            <input
              type="text"
              name="keyword2"
              placeholder="Keyword 2"
              className={`${styles.short_input} ${errorMessages.name && styles.error}`}
              value={formData.keyword2}
              onChange={handleChange}
            />
            <input
              type="text"
              name="keyword3"
              placeholder="Keyword 3"
              className={`${styles.short_input} ${errorMessages.name && styles.error}`}
              value={formData.keyword3}
              onChange={handleChange}
            />

            <select
              name="auctionType"
              className={`${styles.dropdown} ${errorMessages.auctionType && styles.error}`}
              value={formData.auctionType}
              onChange={handleDropdownChange}
            >
              <option value="Unset">Auction Type</option>
              <option value="Forward">Forward</option>
              <option value="Dutch">Dutch</option>
            </select>

            <input
              type="text"
              name="duration"
              placeholder="Duration (hours)"
              className={`${styles.short_input} ${errorMessages.duration && styles.error}`}
              value={formData.duration}
              onChange={handleChange}
            />
            {formData.auctionType === "Dutch" && (
              <input
                type="text"
                name="decrementValue"
                placeholder="Decrement Value"
                className={`${styles.short_input} ${errorMessages.decrementValue && styles.error}`}
                value={formData.decrementValue}
                onChange={handleChange}
              />
            )}
            {formData.auctionType === "Forward" && (
              <input
                type="text"
                name="startingPrice"
                placeholder="Starting Bid Price"
                className={`${styles.short_input} ${errorMessages.startingPrice && styles.error}`}
                value={formData.startingPrice}
                onChange={handleChange}
              />
            )}
          </div>

          <div className={`${styles.error_label} ${displayErrorMessage && styles.show_error}`}>
            {displayErrorMessage || "Please fix the errors and try again"}
          </div>

          <div className={styles.button_container}>
            <AsyncButton
              isLoading={isSubmitLoading}
              onClick={handleSubmit}
              className={`${styles.upload_button} ${styles.active}`}
            >
              upload
            </AsyncButton>
            <AsyncButton
              isLoading={isSaveDraftLoading}
              onClick={handleSaveDraft}
              className={`${styles.save_button} ${styles.active}`}
            >
              save as draft
            </AsyncButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateListing;
