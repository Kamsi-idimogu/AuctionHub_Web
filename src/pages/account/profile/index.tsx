import React from 'react';
import styles from './styles/ProfilePage.module.css';
import Navbar from '@/components/Navbar';
import ListingCard from '@/components/ListingCard';
import { BiEditAlt } from "react-icons/bi";
import { auctions } from '../../api/auction_item_dummy_data';
import { useRouter } from 'next/router';
import { formatUserAddress } from '@/utils/userAddress';

// Placeholder user data - Replace with actual user data from state, props, or API
import { user } from '@/pages/api/user_dummy_data';
import ProtectedComponent from '@/components/ProtectedComponent';



const Profile: React.FC = () => {
  const router = useRouter();

  const navigateToEditItem = (profileItem: string) => {
    router.push(`/account/edit/${profileItem}`);
  }

  const CardGroupTitle = user.role === "Seller" ? "Your Listings" : "Watchlist";

  const CardGroupLegend = 
    user.role === "Seller" ? 
        [
            {name: "Draft", color: "#B6CDE8"},
            {name: "Ongoing", color: "#B6E8B8"},
            {name: "Sold", color: "#E8B6B6"},
            {name: "Expired", color: "#EEEFA7"}
        ]
        :
        [
            {name: "Watching", color: "#B6CDE8"},
            {name: "Highest Bidder", color: "#B6E8B8"},
            {name: "Outbid", color: "#E8B6B6"},
            {name: "Won", color: "#EEEFA7"}
        ];

  return (
    <ProtectedComponent>
        <div className={styles.profileContainer}>
            <Navbar />
            <h2>Your Profile</h2>
            <div className={styles.gridContainer}>
            <div className={styles.gridItem}>
                <span className={styles.gridItemTitle}>First Name</span>
                <div className={styles.itemContainer}>
                    <span className={styles.gridItemText}>{user.first_name}</span>
                    <BiEditAlt className={styles.editIcon} onClick={() => navigateToEditItem("first_name")}/>
                </div>
            </div>
            <div className={styles.gridItem}>
                <span className={styles.gridItemTitle}>Last Name</span>
                <div className={styles.itemContainer}>
                    <span className={styles.gridItemText}>{user.last_name}</span>
                    <BiEditAlt className={styles.editIcon} onClick={() => navigateToEditItem("last_name")}/>
                </div>
            </div>
            <div className={styles.gridItem}>
                <span className={styles.gridItemTitle}>Username</span>
                <div className={styles.itemContainer}>
                    <span className={styles.gridItemText}>{user.username}</span>
                    <BiEditAlt className={styles.editIcon} onClick={() => navigateToEditItem("username")}/>
                </div>
            </div>
            <div className={styles.gridItem}>
                <span className={styles.gridItemTitle}>Password</span>
                <div className={styles.itemContainer}>
                    <span className={styles.gridItemText}>{user.password}</span>
                    <BiEditAlt className={styles.editIcon} onClick={() => navigateToEditItem("password")}/>
                </div>
            </div>
            <div className={styles.gridItemSingle}>
                <span className={styles.gridItemTitle}>Email</span>
                <div className={styles.itemContainer}>
                    <span className={styles.gridItemText}>{user.email}</span>
                    <BiEditAlt className={styles.editIcon} onClick={() => navigateToEditItem("email")}/>
                </div>
            </div>
            <div className={styles.gridItemSingle}>
                <span className={styles.gridItemTitle}>Address</span>
                <div className={styles.itemContainer}>
                    <span className={styles.gridItemText}>{formatUserAddress(user)}</span>
                    <BiEditAlt className={styles.editIcon} onClick={() => navigateToEditItem("address")}/>
                </div>
            </div>
            <div className={styles.gridItem}>
                <span className={styles.gridItemTitle}>Country</span>
                <div className={styles.itemContainer}>
                    <span className={styles.gridItemText}>{user.country}</span>
                    <BiEditAlt className={styles.editIcon} onClick={() => navigateToEditItem("country")}/>
                </div>
            </div>
            <div className={styles.gridItem}>
                <span className={styles.gridItemTitle}>City</span>
                <div className={styles.itemContainer}>
                    <span className={styles.gridItemText}>{user.city}</span>
                    <BiEditAlt className={styles.editIcon} onClick={() => navigateToEditItem("city")}/>
                </div>
            </div>
            </div>
            <div className={styles.watchlistTitle}>
                <h3>{CardGroupTitle}</h3>
                <div className={styles.watchlistLegend}>
                    {CardGroupLegend.map((legendItem, index) => (
                        <span className={styles.watchlistLegendItem} key={index}>
                            <div className={styles.watchlistLegendColor} style={{backgroundColor: legendItem.color}}/>
                            <span className={styles.watchlistLegendText}>{legendItem.name}</span>
                        </span>
                    ))}
                </div>
            </div>
            <div className={styles.watchlistContainer}>
                <ListingCard auction={auctions[0]} backgroundColor='#E8B6B6'/>
            </div>
        </div>
    </ProtectedComponent>
  );
};

export default Profile;
