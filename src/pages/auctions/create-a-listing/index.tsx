import { Inter } from 'next/font/google';
import styles from './styles/CreateListing.module.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'], weight: ["400", "500", "600", "700", "800", "900"] })

const CreateListing: React.FC = () => {
    return (
        <div className={inter.className}>
            <Navbar />
            <div className={styles.container}>
                <h1>Create a Listing</h1>
                <section className={styles.top_section}>
                    <div className={styles.text_container}>
                        <input type="text" name="title" placeholder="Add Title" className={styles.short_input}/>
                        <input type="text" name="price" placeholder="Starting Bid Price" className={styles.short_input}/>
                        <input type="text" name="description" placeholder="Description" className={styles.description_input}/>
                    </div>
                    <div className={styles.image_container}>
                        <div className={styles.image_placeholder} />
                    </div>
                </section>
                <section className={styles.bottom_section}>
                    <div className={styles.dropdown_container}>
                        <select name="category 1" className={styles.dropdown}>
                            <option value="category">Category 1</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="furniture">Furniture</option>
                            <option value="other">Other</option>
                        </select>
                        <select name="category 2" className={styles.dropdown}>
                            <option value="category">Category 2</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="furniture">Furniture</option>
                            <option value="other">Other</option>
                        </select>
                        <select name="category 3" className={styles.dropdown}>
                            <option value="category">Category 3</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="furniture">Furniture</option>
                            <option value="other">Other</option>
                        </select>
                        <select name="auction type" className={styles.dropdown}>
                            <option value="auction type">Auction Type</option>
                            <option value="electronics">Forward</option>
                            <option value="clothing">Dutch</option>
                        </select>

                        <input type="text" name="duration" placeholder="Duration" className={styles.short_input}/>
                        <input type="text" name="decrement_value" placeholder="Decrement Value" className={styles.short_input}/>
                    </div>

                    <div className={styles.button_container}>
                        <button type="submit" className={`${styles.upload_button} ${styles.active}`}>upload</button>
                        <button type="submit" className={`${styles.save_button} ${styles.active}`}>save as draft</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CreateListing;
