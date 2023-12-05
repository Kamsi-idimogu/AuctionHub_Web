import React from "react";
import Link from "next/link";
import styles from "./styles/Login.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import AsyncButton from "@/components/AsyncButton";
import router from "next/router";
import { userLogin } from "../api/auth/auth-api";
// import { useAuth } from "@/contexts/authContext";
import { useAuthStore } from "@/store/authStore";
import { user } from "../api/user_dummy_data"; // using dummy data for now
import { CreateUserFromServer } from "@/utils/api-helpers/User";

const inter = Inter({ subsets: ["latin"] });

const Login = () => {
  const { isLoggedIn, login } = useAuthStore();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (validateLogin()) {
      setIsLoading(true);

      let resp: any;

      try {
        resp = await userLogin({ username, password });

        if (resp === undefined) {
          alert("Something went wrong. Please try again later");
          return;
        }

        if (resp.status === "failed") {
          alert(resp.message || "Error occured while logging you in. Please try again later.");
          setErrorMessage(
            resp.message || "Error occured while logging you in. Please try again later."
          );
          return;
        }

        const token = resp?.data?.token || "dummy-token";

        const expiry = 60; // the expiry time in minutes

        const user = CreateUserFromServer(resp.data);

        login(user, token, expiry);
      } catch (error) {
        console.log(error);
        setErrorMessage("Error occured while logging you in. Please try again later.");
      } finally {
        setIsLoading(false);

        clearAllData();
        router.push(`/account/profile`);

        if (resp?.status === false) return;
      }
    }
  };

  const validateLogin = () => {
    if (username === "") {
      setErrorMessage("Username is required");
      return false;
    }
    if (password === "") {
      setErrorMessage("Password is required");
      return false;
    }
    return true;
  };

  // // simulate login attempt / communication with backend
  // const handleLoginAttempt = () => {
  //     if (username === "admin" && password === "admin") {
  //         clearAllData();
  //         // redirect to profile page
  //         router.push(`/account/profile`)
  //     }
  //     else {
  //         setErrorMessage("Invalid username or password");
  //     }
  // }

  const clearAllData = () => {
    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    // redirect to profile page if user is logged in
    if (isLoggedIn()) {
      router.push(`/account/profile`);
    }
  }, []);

  return (
    <div className={`${styles.page} ${inter.className}`}>
      <div className={styles.image_container}>
        <Image src={"/images/banner.png"} alt="login-banner" width={713} height={1024} />
      </div>
      <section className={styles.text_container}>
        <Link href="/" style={{ width: "max-content" }}>
          <h3 className={styles.header}>Auction Hub</h3>
        </Link>
        <aside className={styles.text_body}>
          <h1 className={styles.title}>Login to Start Bidding</h1>
          <form className={styles.form}>
            <input
              type="text"
              name="username"
              className={styles.input_box}
              placeholder="Username"
              value={username}
              onChange={handleUsername}
            />
            <input
              type="password"
              name="password"
              className={styles.input_box}
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />
            <label className={`${styles.error_label} ${errorMessage && styles.active}`}>
              {errorMessage || "Invalid username or password"}
            </label>
            <AsyncButton onClick={handleLogin} className={styles.submit_btn} isLoading={isLoading}>
              Login
            </AsyncButton>
          </form>
          {/* <Link href="/account/forgot-password">
            <i>
              <p className={styles.reset_password}>Forgot your password?</p>
            </i>
          </Link> */}
          <Link href="/register">
            <i>
              <p className={styles.reset_password}>Create an account</p>
            </i>
          </Link>
        </aside>
      </section>
    </div>
  );
};

export default Login;
