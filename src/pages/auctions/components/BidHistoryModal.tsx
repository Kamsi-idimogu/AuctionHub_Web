import React from 'react';
import styles from '../styles/BidHistoryModal.module.css'; 


type BidHistoryModalProps = {
    onClose: () => void;
    bidHistory: Array<{ bidder: string; bid: number; time: string }>;
};

const BidHistoryModal: React.FC<BidHistoryModalProps> = ({ onClose, bidHistory = [] }) => {
    return (
        <>
            <div className={styles.backdrop} onClick={onClose} />
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>Bid History</h2>
                <table className={styles.bidHistoryTable}>
                    <thead>
                        <tr>
                            <th>Bidder</th>
                            <th>Bid</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bidHistory && bidHistory.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.bidder}</td>
                                <td>${entry.bid}</td>
                                <td>{entry.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BidHistoryModal;
