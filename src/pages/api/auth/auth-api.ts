import axios from "axios";
import {
  EDIT_USER_PROFILE_ENDPOINT,
  LOGIN_ENPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
} from "../endpoints";
import { errorHandler } from "../error_handler";
import { User } from "@/dto";

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

    const resp = await axios.post(REGISTER_ENDPOINT, { ...userPayload }, { withCredentials: true });

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

export const editUserProfile = async (formData: User): Promise<payload> => {
  try {
    const userPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.username,
      email: formData.email,
      street_name: formData.street_name,
      street_number: formData.street_number,
      country: formData.country,
      city: formData.city,
      postal_code: formData.postal_code,
    };

    const resp = await axios.patch(
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
