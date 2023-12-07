import Link from "next/link";
import styles from "../styles/EditProfile.module.css";
import { User } from "@/dto";
import { useState } from "react";
import AsyncButton from "@/components/AsyncButton";
import Button from "@/components/Button";
import { editUserProfile } from "@/pages/api/auth/auth-api";
import router from "next/router";
import { USER_ACCOUNT } from "@/store/cache/cacheKeys";
import { useAuthStore } from "@/store/authStore";
import { addToCache } from "@/store/cache/cache";
import Cookies from "js-cookie";

interface EditProfileItemProps {
  profile: User;
  onResetProfile?: (profile: User) => void;
  title: string;
  field: string;
  oldValue?: string;
  profile_field?: string;
}

const EditProfileItem = ({
  profile,
  onResetProfile,
  title,
  oldValue,
  field,
}: EditProfileItemProps) => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const updateProperty = async () => {
    if (!validateProperty()) {
      setErrorMessage(`${title} is invalid. Please enter a valid one.`);
      return;
    }

    setIsLoading(true);

    try {
      const resp: any = await editUserProfile({ ...profile, [field]: value });
      onResetProfile && onResetProfile({ ...profile, [field]: value });

      if (resp === undefined) {
        alert("Something went wrong. Please try again later");
        return;
      }

      if (resp.status === "failed") {
        alert("Error updating your profile. Please try again later.");
        return;
      }

      updateUserLocally({ ...profile, [field]: value });

      router.push(`/account/profile`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateProperty = () => {
    const isEmailValid = (email: string) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    switch (title) {
      case "First Name":
        return value.length > 0;
      case "Last Name":
        return value.length > 0;
      case "Username":
        return value.length > 0;
      case "Password":
        return value.length > 0;
      case "Email":
        return isEmailValid(value);
      case "Address":
        return value.length > 0;
      case "Country":
        return value.length > 0;
      case "City":
        return value.length > 0;
      case "Street Number":
        return value.length > 0;
      case "Street Name":
        return value.length > 0;
      default:
        return false;
    }
  };

  const goToProfilePage = () => {
    router.push(`/account/profile`);
  };

  const rehydrate = useAuthStore((state) => state.rehydrate);

  const updateUserLocally = (user: User) => {
    const token = Cookies.get("aH_user_session_token");
    if (token) {
      addToCache({ key: USER_ACCOUNT, value: user });
      rehydrate(user, token);
    }
  };

  return (
    <form>
      <label>New {title}</label>
      <input
        type="text"
        name={title}
        placeholder={oldValue || "Enter Here"}
        value={value}
        onChange={handleChange}
      />
      <div className={`${styles.error_label} ${errorMessage && styles.active}`}>
        {errorMessage || "Invalid Property"}
      </div>
      <AsyncButton onClick={updateProperty} className={styles.submit_btn} isLoading={isLoading}>
        Save
      </AsyncButton>
      <Button onClick={goToProfilePage} className={styles.cancel_btn}>
        Cancel
      </Button>
    </form>
  );
};

export default EditProfileItem;
