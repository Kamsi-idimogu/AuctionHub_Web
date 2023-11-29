"use client";
import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import styles from '../styles/CreateListing.module.css';
import Navbar from '@/components/Navbar';
import { AuctionItem } from '@/dto';
import { auctions } from '@/pages/api/auction_item_dummy_data';
import router from 'next/router';
import AsyncButton from '@/components/AsyncButton';

const inter = Inter({ subsets: ['latin'], weight: ["400", "500", "600", "700", "800", "900"] })

interface CreateListingProps {
    editAuctionId?: string | string[];
}

const CreateListing = ({ editAuctionId }:CreateListingProps) => {
    const [auctionItem, setAuctionItem] = useState<AuctionItem>({
        id: "",
        name: "",
        description: "",
        imageUrl: "",
        startingPrice: undefined,
        reservePrice: undefined,
        currentPrice: undefined,
        auctionType: "Unset",
        auctionStartTime: new Date(),
        auctionEndTime: new Date(),
        auctionStatus: "Open"
    });

    const [auctionImage, setAuctionImage] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        auctionType: "",
        category1: "",
        category2: "",
        category3: "",
        startingPrice: "", // only for forward auctions
        duration: "", // only for dutch auctions
        decrementValue: "", // only for dutch auctions
    })

    const [errorMessages, setErrorMessages] = useState({
        name: "",
        description: "",
        startingPrice: "",
        auctionType: "",
        duration: "",
        decrementValue: "",
        category1: "",
        category2: "",
        category3: ""
    })
    const [displayErrorMessage, setDisplayErrorMessage] = useState<string>("")


    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false)
    const [isSaveDraftLoading, setIsSaveDraftLoading] = useState<boolean>(false)

    const findAuctionItem = (id: string) => {
        const auction = auctions.find(auction => auction.id === id);
        if (auction) {
            setAuctionItem(auction);
        }
    }

    useEffect(() => {
        if ( typeof editAuctionId === "string") {
            findAuctionItem(editAuctionId);
        }
    }, [editAuctionId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // clear error message when user starts typing
        setErrorMessages(prevState => ({
            ...prevState,
            [name]: ""
        }));
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // clear error message when user starts typing
        setErrorMessages(prevState => ({
            ...prevState,
            [name]: ""
        }));
    }

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // clear error message when user starts typing
        setErrorMessages(prevState => ({
            ...prevState,
            [name]: ""
        }));

        console.log(value);
    }

    const validateNumberInput = (input: string) => {
        // check if input is a whole number greater than 0
        const re = /^[1-9]\d*$/;
        return re.test(input);
    }

    const validateForm = () => {
        const newErrorMessages = {
            name: formData.name === "" ? "Name is required" : "",
            description: formData.description === "" ? "Description is required" : "",
            auctionType: (formData.auctionType === "" || formData.auctionType === "Unset") ? "Auction Type is required" : "",
            category1: (formData.category1 === "" || formData.category1 === "category") ? "Category 1 is required" : "",
            category2: (formData.category2 === "" || formData.category2 ==="category" )? "Category 2 is required" : "",
            category3: (formData.category3 === "" || formData.category3 === "category") ? "Category 3 is required" : "",
            startingPrice: formData.auctionType === "Forward" ? formData.startingPrice === "" ? "Starting Price is required" : validateNumberInput(formData.startingPrice) ? "" :  "Starting Price must be a whole number greater than 0" : "",
            decrementValue: formData.auctionType === "Dutch" ? formData.decrementValue === "" ? "Decrement Value is required" : validateNumberInput(formData.decrementValue) ? "" :  "Decrement Value must be a whole number greater than 0" : "",
            duration: formData.auctionType === "Dutch" ? formData.duration === "" ? "Duration is required" : validateNumberInput(formData.duration) ? "" :  "Duration must be provided in hours and greater than 0" : "",
        }

        setErrorMessages(newErrorMessages);

        // check if there are any error messages
        const anyErrors = Object.values(newErrorMessages).some((errorMessage) => errorMessage !== "");
        if (anyErrors) {
            // set display error message to first error message seen in the object
            const firstErrorMessage = Object.values(newErrorMessages).find((errorMessage) => errorMessage !== "");
            if (firstErrorMessage) {
                setDisplayErrorMessage(firstErrorMessage);
            }
        }

        return !anyErrors;
    }

    const clearAllData = () => {
        setFormData({
            name: "",
            description: "",
            auctionType: "",
            category1: "",
            category2: "",
            category3: "",
            startingPrice: "",
            duration: "", 
            decrementValue: "", 
        });
        setErrorMessages({
            name: "",
            description: "",
            startingPrice: "",
            auctionType: "",
            duration: "",
            decrementValue: "",
            category1: "",
            category2: "",
            category3: ""
        });
        setDisplayErrorMessage("");
    }

    // function to handle communication with backend
    const handleCreateListingAttempt = () => {
        clearAllData();

        alert("Communication with server is yet to be integrated, but the Listing has been created! You will be redirected to your profile page in 5 seconds");

        // redirect to login page
        setTimeout(() => {
            router.push(`/account/profile`)
        }, 5000);

    }

    const handleSubmit = () => {
        if (validateForm()) {
            setIsSubmitLoading(true);
            setTimeout(() => {
                handleCreateListingAttempt();
                setIsSubmitLoading(false);
            }, 3000);
        }
    }

    const handleSaveDraft = () => {
        if (validateForm()) {
            setIsSaveDraftLoading(true);
            setTimeout(() => {
                handleCreateListingAttempt();
                setIsSaveDraftLoading(false);
            }, 3000);
        }
    }  

    return (
        <div className={inter.className}>
            <Navbar />
            <div className={styles.container}>
                <h1>Create a Listing</h1>
                <section className={styles.top_section}>
                    <div className={styles.text_container}>
                        <input type="text" name="name" placeholder="Add Title" className={`${styles.short_input} ${errorMessages.name && styles.error}`} value={auctionItem.name || formData.name} onChange={handleChange}/>
                        {/* <input type="text" name="startingPrice" placeholder="Starting Bid Price" className={`${styles.short_input} ${errorMessages.startingPrice && styles.error}`} value={auctionItem.startingPrice || formData.startingPrice} onChange={handleChange}/>                         */}
                        <textarea name="description" placeholder="Description" className={`${styles.description_input} ${errorMessages.description && styles.error}`} value={auctionItem.description || formData.description} onChange={handleTextAreaChange}/>
                    </div>
                    <div className={styles.image_container}>
                        <div className={styles.image_placeholder} />
                    </div>
                </section>
                <section className={styles.bottom_section}>
                    <div className={styles.dropdown_container}>
                        {/* TODO: UPDATE THE VALUE OF AUCTIONITEM WHEN THE DROPDOWN VALUE CHANGES */}
                        <select name="category1" className={`${styles.dropdown} ${errorMessages.category1 && styles.error}`} value={formData.category1} onChange={handleDropdownChange}>
                            <option value="category">Category 1</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="furniture">Furniture</option>
                            <option value="other">Other</option>
                        </select>
                        <select name="category2" className={`${styles.dropdown} ${errorMessages.category2 && styles.error}`} value={formData.category2} onChange={handleDropdownChange}>
                            <option value="category">Category 2</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="furniture">Furniture</option>
                            <option value="other">Other</option>
                        </select>
                        <select name="category3" className={`${styles.dropdown} ${errorMessages.category3 && styles.error}`} value={formData.category3} onChange={handleDropdownChange}>
                            <option value="category">Category 3</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="furniture">Furniture</option>
                            <option value="other">Other</option>
                        </select>
                        <select name="auctionType" className={`${styles.dropdown} ${errorMessages.auctionType && styles.error}`} value={formData.auctionType} onChange={handleDropdownChange}>
                            <option value="Unset">Auction Type</option>
                            <option value="Forward">Forward</option>
                            <option value="Dutch">Dutch</option>
                        </select>

                        {formData.auctionType === "Dutch" && <input type="text" name="duration" placeholder="Duration" className={`${styles.short_input} ${errorMessages.duration && styles.error}`} value={formData.duration} onChange={handleChange}/> }
                        {formData.auctionType === "Dutch" && <input type="text" name="decrementValue" placeholder="Decrement Value" className={`${styles.short_input} ${errorMessages.decrementValue && styles.error}`} value={formData.decrementValue} onChange={handleChange}/> }
                        {formData.auctionType === "Forward" && <input type="text" name="startingPrice" placeholder="Starting Bid Price" className={`${styles.short_input} ${errorMessages.startingPrice && styles.error}`} value={auctionItem.startingPrice || formData.startingPrice} onChange={handleChange}/> }                      

                    </div>

                    <div className={`${styles.error_label} ${displayErrorMessage && styles.show_error}`}>{displayErrorMessage || "Please fix the errors and try again"}</div>

                    <div className={styles.button_container}>
                        <AsyncButton isLoading={isSubmitLoading} onClick={handleSubmit} className={`${styles.upload_button} ${styles.active}`}>upload</AsyncButton>
                        <AsyncButton isLoading={isSaveDraftLoading} onClick={handleSaveDraft} className={`${styles.save_button} ${styles.active}`}>save as draft</AsyncButton>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CreateListing;
