import styles from "@/styles/CreateListingCard.module.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const CreateListingCard = () => {
    const router = useRouter();

    const navigateToCreateListing = () => {
        router.push("/auctions/create-a-listing");
    }

    return (
        <div className={styles.card} onClick={navigateToCreateListing}>
            <div className={styles.card_icon}>
                <IoAddCircleOutline />
            </div>
            <div className={styles.card_title}>
                <h3>Create</h3>
            </div>
        </div>
    );
}

export default CreateListingCard;
