"use client";
import React from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import styles from "./styles/TermsAndCondition.module.css";

const inter = Inter({ subsets: ["latin"] });

const TermsAndCondition: React.FC = () => {
  return (
    <div className={`${inter.className}`}>
      <Navbar />
      <div className={styles.container}>
        <h1>Terms and Conditions</h1>
        <ol>
          <li>Introduction</li>
          <p>
            {`These terms and conditions outline the rules and 
                    regulations for the use of Auction Hub's Website.`}
          </p>

          <li>
            By accessing this website, you accept these terms and conditions in full. Do not
            continue to use Auction Hub if you do not agree to all of the terms and conditions
            stated on this page.
          </li>
          <p />

          <li>License</li>
          <p>
            Unless otherwise stated, Auction Hub owns the intellectual property rights for all
            material. All intellectual property rights are reserved.
          </p>

          <li>Restrictions</li>
          <div className={styles.table_item_subheading}>
            You are restricted from: <br />
            <ul>
              <li>Selling, and/or commercializing any website material.</li>
              <li>
                Using this website in a way that is damaging, or that could be damaging to this
                website.
              </li>
              <li>Using this website contrary to applicable laws and regulations.</li>
            </ul>
          </div>

          <li>User Content</li>
          <p>
            {`In these terms and conditions, "User Content" shall mean any audio,
                     video, text, images, or other material you choose to display on this
                      website. By displaying it, you grant Auction Hub a non-exclusive 
                      license to use, reproduce, and edit any of your User Content.`}
          </p>

          <li>No warranties</li>
          <p>
            {`This website is provided "as is," with all faults, and Auction Hub makes 
                    no express or implied representations or warranties.`}
          </p>

          <li>Limitation of liability</li>
          <p>
            In no event shall Auction Hub be liable for anything arising out of or in any way
            connected with your use of this website.
          </p>

          <li>Variation of Terms</li>
          <p>
            Auction Hub is permitted to revise these terms at any time as it sees fit, and by using
            this website, you are expected to review these terms on a regular basis.
          </p>
        </ol>
      </div>
    </div>
  );
};

export default TermsAndCondition;
