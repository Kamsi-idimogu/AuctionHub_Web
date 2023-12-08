"use client";

import React, { useState } from "react";
import styles from "../styles/upload-image.module.css";

export interface ImageUpload {
  inputName?: string;
  onSubmit: (file: File, inputName?: string) => void;
}

const ImageUpload: React.FC<ImageUpload> = ({ onSubmit, inputName }) => {
  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [hasUploaded, setHasUploaded] = useState(false);

  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleSelectImageClick = () => {
    fileInputRef.current?.click();
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    setUploading(true);
    e.preventDefault();
    if (!file) {
      setUploading(false);
      return;
    }

    try {
      onSubmit(file, inputName);
      setHasUploaded(true);
    } catch (e: any) {
      console.error(e);
    }
    setUploading(false);
  };

  return (
    <form onSubmit={submit} className={styles.form} method="post">
      <div className={styles.image_preview}>
        {selectedImage ? (
          <img src={selectedImage} alt="" />
        ) : (
          <span
            onClick={handleSelectImageClick}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              fontSize: "5rem",
              fontWeight: "300",
            }}
          >
            <input
              type="file"
              accept="image/*"
              name="file"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files?.[0];
                  setFile(file);
                  setSelectedImage(URL.createObjectURL(file));
                }
              }}
              ref={fileInputRef}
              className={styles.select_file}
              style={{ display: "none" }}
            />
            +
            <br />
            <p style={{ fontSize: "1.6rem", display: "block" }}> Click to Upload an Image</p>
          </span>
        )}
      </div>

      <input
        type="submit"
        value={uploading ? "Uploading.." : "Upload"}
        disabled={uploading}
        className={styles.submit_button}
      />
      {hasUploaded && (
        <p style={{ color: "green", marginTop: "1em" }}>Image uploaded successfully!</p>
      )}
    </form>
  );
};

export default ImageUpload;
