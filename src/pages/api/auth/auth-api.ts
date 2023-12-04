import axios from "axios";
import {
  EDIT_USER_PROFILE_ENDPOINT,
  LOGIN_ENPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
} from "../endpoints";
import { errorHandler } from "../error_handler";

export const userRegistration = async (formData: any): Promise<payload> => {
  try {
    const userPayload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      password: formData.password,
      email: formData.email,
      street_name: formData.streetName,
      street_number: formData.streetNumber,
      country: formData.country,
      city: formData.city,
      postal_code: formData.postalCode,
      isSeller: formData.isSeller,
    };

    const resp = await axios.post(REGISTER_ENDPOINT, { ...userPayload });

    console.log("response:", resp);

    return {
      status: resp.data.status || "success",
      message: resp.data.message,
      data: resp.data.data,
    };
  } catch (error: any) {
    console.log("error:", error);
    return errorHandler(error);
  }
};

export const editUserProfile = async (formData: any): Promise<payload> => {
  try {
    const userPayload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      email: formData.email,
      street_name: formData.streetName,
      street_number: formData.streetNumber,
      country: formData.country,
      city: formData.city,
      postal_code: formData.postalCode,
    };

    const resp = await axios.post(
      EDIT_USER_PROFILE_ENDPOINT,
      { ...userPayload },
      { withCredentials: true }
    );

    console.log("response:", resp);

    return {
      status: resp.data.status || "success",
      message: resp.data.message,
      data: resp.data.data,
    };
  } catch (error: any) {
    console.log("error:", error);
    return errorHandler(error);
  }
};

export const userLogin = async (formData: any): Promise<payload> => {
  try {
    const userPayload = {
      username: formData.username,
      password: formData.password,
    };

    const resp = await axios.post(LOGIN_ENPOINT, { ...userPayload }, { withCredentials: true });

    console.log("response:", resp);

    if (resp.headers && resp.headers["set-cookie"]) {
      console.log("Cookies:", resp.headers["set-cookie"]);
    } else {
      console.log("No cookies were set.");
    }

    return {
      status: resp.data.status || "success",
      message: resp.data.message,
      data: resp.data.data,
    };
  } catch (error: any) {
    console.log("error:", error);
    return errorHandler(error);
  }
};

export const userLogout = async (): Promise<payload> => {
  try {
    const resp = await axios.post(
      LOGOUT_ENDPOINT,
      {},
      {
        withCredentials: true,
      }
    );

    console.log("response:", resp);

    return {
      status: resp.data.status || "success",
      message: resp.data.message,
      data: resp.data.data,
    };
  } catch (error: any) {
    console.log("error:", error);
    return errorHandler(error);
  }
};
