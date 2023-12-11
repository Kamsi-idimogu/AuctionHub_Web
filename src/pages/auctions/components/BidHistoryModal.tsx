import React from "react";
import styles from "../styles/BidHistoryModal.module.css";
import { EpochToDateTime } from "@/utils/dateTime";

type BidHistoryModalProps = {
  onClose: () => void;
  bidHistory: Array<{ bidder_name: string; bid_amount: number; created_at: string }>;
};

const BidHistoryModal: React.FC<BidHistoryModalProps> = ({ onClose, bidHistory = [] }) => {
  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>Bid History</h2>
        <table className={styles.bidHistoryTable}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Bid</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {bidHistory &&
              bidHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.bidder_name}</td>
                  <td>${entry.bid_amount}</td>
                  <td>{EpochToDateTime(Number(entry.created_at))}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BidHistoryModal;
