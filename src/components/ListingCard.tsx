import { useRouter } from 'next/router'
import { AuctionItem } from "@/dto";
import Image from 'next/image'
import Button from './Button';
import styles from '@/styles/ListingCard.module.css'

interface ListingCardProps {
    auction: AuctionItem
    backgroundColor?: string
    wantTime?: boolean
}
const ListingCard = ({ auction, backgroundColor, wantTime = true }:ListingCardProps) => {
    const router = useRouter();

    const handleSelect = () => {
        router.push(`/auctions/${auction.id}`);
    }

    const truncateText = (text: string, wordLimit: number) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
          return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    const truncatedDescription = truncateText(auction.description, 20);

    return(
        <div className={styles.auction_card} style={{backgroundColor}}>
            <div className={styles.auction_image}>
                <Image src={auction.imageUrl} alt='product_image' width={260} height={227} />
            </div>
            <div className={styles.auction_info}>
                <div className={styles.auction_title_and_price}>
                    <h3>{auction.name}</h3>
                    <h3 style={{color: "#FF5454"}}>${auction.currentPrice}</h3>
                </div>
                <div className={styles.auction_description}>
                    <p className={styles.auction_description_text}>{truncatedDescription}</p>
            
                    <p>Auction Type: <span>{auction.auctionType}</span></p>
                </div>
                <div className={styles.auction_time_and_bid}>
                    <div className={styles.auction_buttons}>
                        <Button onClick={handleSelect} className={styles.select_btn}><div>select</div></Button>
                    </div>
                    {auction.auctionStatus === "Draft" && <div className={styles.auction_buttons}>
                        <Button onClick={handleSelect} className={styles.select_btn}><div>upload</div></Button>
                        <Button onClick={()=>{}} className={styles.watchlist_btn}><div>edit</div></Button>
                    </div> }
                    <p style={wantTime ? {visibility: 'visible'} : {visibility: 'hidden'}}>Remaining Time: <span style={{color: "#FF5454"}}>00:33:11</span></p>
                </div>
            </div>
        </div>
    )
}

export default ListingCard;
