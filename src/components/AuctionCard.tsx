import { useRouter } from 'next/router'
import { AuctionItem } from '@/dto'
import styles from '@/styles/AuctionCard.module.css'
import Image from 'next/image'
import Button from './Button'
import AsyncButton from './AsyncButton'
import AuctionCountdown from './AuctionCountdown'

interface AuctionCardProps {
    auction: AuctionItem
}
const AuctionCard = ({ auction }:AuctionCardProps) => {
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

    const handleCategoryClick = (auction_type: string) => {
        const currentQuery = { ...router.query, auction_type };
        router.push({
            pathname: '/auctions',
            query: currentQuery,
        });
    }

    // const time = Date.now() + 172800000; // 48 hours from now in epoch
    const time =  1701834593247;

    return (
        <div className={styles.auction_card}>
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
            
                    <p>Auction Type: <span style={{color: "#13B8FF", cursor: "pointer"}} onClick={() => handleCategoryClick(auction.auctionType)}>{auction.auctionType}</span></p>
                </div>
                <div className={styles.auction_time_and_bid}>
                    <div className={styles.auction_buttons}>
                        <Button onClick={handleSelect} className={styles.select_btn}><div>select</div></Button>
                        {/* <AsyncButton isLoading={false} onClick={()=>{}} className={styles.watchlist_btn} loadingSize={20}><div>add to watchlist</div></AsyncButton> */}
                    </div>
                    <p>Remaining Time: <span style={{color: "#FF5454"}}><AuctionCountdown endTime={time.toString()}/></span></p>
                </div>
            </div>
        </div>
    )
}

export default AuctionCard
