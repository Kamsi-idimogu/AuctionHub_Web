import React, { useState, useEffect } from "react";
import styles from "./styles/Signup.module.css";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import router from "next/router";
import AsyncButton from "@/components/AsyncButton";
import { userLogin, userRegistration } from "../api/auth/auth-api";
import { CreateUserFromServer } from "@/utils/api-helpers/User";
import { useAuthStore } from "@/store/authStore";

const inter = Inter({ subsets: ["latin"] });

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    streetName: "",
    streetNumber: "",
    postalCode: "",
    country: "",
    city: "",
    isSeller: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    streetName: "",
    streetNumber: "",
    postalCode: "",
    country: "",
    city: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleIsSeller = () => {
    setFormData((prevState) => ({
      ...prevState,
      isSeller: !prevState.isSeller,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // clear error message when user starts typing
    setErrorMessages((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrorMessages = {
      firstName: formData.firstName === "" ? "First name is required" : "",
      lastName: formData.lastName === "" ? "Last name is required" : "",
      username: formData.username === "" ? "Username is required" : "",
      password: formData.password === "" ? "Password is required" : formData.password.length < 8 ? "Password must be at least 8 characters" : "",
      email:
        formData.email === ""
          ? "Email is required"
          : validateEmail(formData.email)
          ? ""
          : "Email is invalid",
      streetName: formData.streetName === "" ? "Street Name is required" : "",
      streetNumber: formData.streetNumber === "" ? "Street Number is required" : "",
      postalCode: formData.postalCode === "" ? "Postal code is required" : "",
      country: formData.country === "" ? "Country is required" : "",
      city: formData.city === "" ? "City is required" : "",
    };
    setErrorMessages(newErrorMessages);

    // check if there are any error messages
    return Object.values(newErrorMessages).every((x) => x === "");
  };

  const { login } = useAuthStore();

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);

      let resp: any;

      try {
        resp = await userRegistration(formData);

        if (resp === undefined) {
          alert("Something went wrong. Please try again later");
          return;
        }

        if (resp.status === "failed") {
          alert("You are already registered. Please login to continue");
          return;
        }

        const { username, password } = resp.data;

        // Handle logging in
        const loginResp: any = await userLogin({ username, password });

        if (loginResp === undefined) {
          alert("Something went wrong. Please try again later");
          return;
        }

        if (loginResp.status === "failed") {
          alert("Error loggin you in. Please try again later.");
          return;
        }

        const user = CreateUserFromServer(loginResp.data);

        const token = resp?.data?.token || "dummy-token";

        const expiry = 60; // the expiry time in minutes

        login(user, token, expiry);

        clearAllData();
        router.push(`/account/profile`);
      } catch (error) {
        console.log(error);
      } finally {
          setIsLoading(false);

        if (resp?.status === false) return;
      }
    }
  };

  const clearAllData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      streetName: "",
      streetNumber: "",
      postalCode: "",
      country: "",
      city: "",
      isSeller: false,
    });
    setErrorMessages({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      streetName: "",
      streetNumber: "",
      postalCode: "",
      country: "",
      city: "",
    });
  };

  return (
    <div className={inter.className}>
      <div className={styles.page}>
        {/* <div className={styles.image_placeholder}/> */}
        <div className={styles.image_container}>
          <Image src={"/images/banner.png"} alt="login-banner" width={713} height={1024} />
        </div>
        <section className={styles.text_container}>
          <Link href="/" style={{ width: "max-content" }}>
            <h3 className={styles.header}>Auction Hub</h3>
          </Link>
          <aside className={styles.text_body}>
            <h1 className={styles.title}>Start Bidding Now</h1>
            <form className={styles.form}>
              <div className={styles.input_pair}>
                <div className={styles.input_box_container}>
                  <input
                    type="text"
                    name="firstName"
                    className={styles.input_box}
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <label
                    className={`${styles.error_label} ${errorMessages.firstName && styles.active}`}
                  >
                    {errorMessages.firstName || "Invalid First name"}
                  </label>
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <input
                    type="text"
                    name="lastName"
                    className={styles.input_box}
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <label
                    className={`${styles.error_label} ${errorMessages.lastName && styles.active}`}
                  >
                    {errorMessages.lastName || "Invalid Last name"}
                  </label>
                </div>
              </div>
              <div className={styles.input_pair}>
                <div className={styles.input_box_container}>
                  <input
                    type="text"
                    name="username"
                    className={styles.input_box}
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <label
                    className={`${styles.error_label} ${errorMessages.username && styles.active}`}
                  >
                    {errorMessages.username || "Invalid username"}
                  </label>
                </div>
                <div className={styles.input_box_container}>
                  <input
                    type="password"
                    name="password"
                    className={styles.input_box}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label
                    className={`${styles.error_label} ${errorMessages.password && styles.active}`}
                  >
                    {errorMessages.password || "Invalid password"}
                  </label>
                </div>
              </div>
              <div className={styles.input_box_container}>
                <input
                  type="text"
                  name="email"
                  className={styles.input_box}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label className={`${styles.error_label} ${errorMessages.email && styles.active}`}>
                  {errorMessages.email || "Invalid email"}
                </label>
              </div>
              <div className={styles.input_pair}>
                <div className={styles.input_box_container}>
                  <input
                    type="text"
                    name="streetName"
                    className={styles.input_box}
                    placeholder="Street Name"
                    value={formData.streetName}
                    onChange={handleChange}
                  />
                  <label
                    className={`${styles.error_label} ${errorMessages.streetName && styles.active}`}
                  >
                    {errorMessages.streetName || "Invalid streetName"}
                  </label>
                </div>
                <div className={styles.input_box_container}>
                  <input
                    type="text"
                    name="streetNumber"
                    className={styles.input_box}
                    placeholder="Street No"
                    value={formData.streetNumber}
                    onChange={handleChange}
                  />
                  <label
                    className={`${styles.error_label} ${
                      errorMessages.streetNumber && styles.active
                    }`}
                  >
                    {errorMessages.streetNumber || "Invalid streetNumber"}
                  </label>
                </div>
                <div className={styles.input_box_container}>
                  <input
                    type="text"
                    name="postalCode"
                    className={styles.input_box}
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                  <label
                    className={`${styles.error_label} ${errorMessages.postalCode && styles.active}`}
                  >
                    {errorMessages.postalCode || "Invalid postal code"}
                  </label>
                </div>
              </div>
              <div className={styles.input_pair}>
                <div className={styles.input_box_container}>
                  <input
                    type="text"
                    name="country"
                    className={styles.input_box}
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  <label
                    className={`${styles.error_label} ${errorMessages.country && styles.active}`}
                  >
                    {errorMessages.country || "Invalid country"}
                  </label>
                </div>
                <div className={styles.input_box_container}>
                  <input
                    type="text"
                    name="city"
                    className={styles.input_box}
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <label className={`${styles.error_label} ${errorMessages.city && styles.active}`}>
                    {errorMessages.city || "Invalid city"}
                  </label>
                </div>
              </div>
              <label className={styles.signup_checkbox}>
                <input
                  type="checkbox"
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={toggleIsSeller}
                />
                Sign up as a Seller
              </label>
              <AsyncButton
                onClick={handleSubmit}
                className={styles.submit_btn}
                isLoading={isLoading}
              >
                join now
              </AsyncButton>
            </form>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
