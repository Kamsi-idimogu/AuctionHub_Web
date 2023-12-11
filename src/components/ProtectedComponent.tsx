import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useAuthStore } from "../store/authStore";
import LoadingIndicator from "./LoadingIndicator";
import styles from "@/styles/ProtectedComponent.module.css";

interface ProtectedComponentProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn()) {
    return (
      <div className={`${styles.loading_container}`}>
        <LoadingIndicator width={100} height={100} />
        <h1 className={styles.loading_text}>Loading...</h1>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedComponent;
