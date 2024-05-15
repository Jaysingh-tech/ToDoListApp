/* eslint-disable no-unused-vars */
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import {
  IRegisterForm,
  IRegisterFormError
} from "../interfaces/registerInterface";
import { setUserDetails } from "../redux-toolkit/slices/auth.slice";

const fieldName: any = {
  firstName: "First name",
  confirmPassword: "Confirm password",
  email: "Email address",
  lastName: "Last name",
  password: "Password",
  username: "Username",
  profile: "Profile image"
};

const API_URL = process.env.NEXT_API_URL;

export const registerContainer = () => {
  const [formData, setFormData] = useState<IRegisterForm>({
    firstName: "",
    confirmPassword: "",
    email: "",
    lastName: "",
    password: "",
    username: "",
    profile: undefined
  });
  const [formErrors, setFormErrors] = useState<IRegisterFormError>({
    firstName: "",
    confirmPassword: "",
    email: "",
    lastName: "",
    password: "",
    username: "",
    profile: ""
  });
  const [loading, setLoading] = useState(false);
  const form = new FormData();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData?.profile) delete formData.profile;
    if (Object.values(formData).every((val) => val)) {
      Object.entries(formData).forEach(([name, value]) => {
        form.append(name, value);
      });
      setLoading(true);
      await axios
        .post(`${API_URL}/sign-up`, form, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then((resp) => {
          dispatch(setUserDetails(resp.data.profile));
          setCookie("token", resp.data.token);
          setLoading(false);
          location.replace("/dashboard");
        })
        .catch((error) => {
          if (error.response.data.data?.field) {
            setFormErrors((prev) => ({
              ...prev,
              [error.response.data.data?.field]: error?.response?.data?.message
            }));
          } else {
            toast.error(error?.response?.data?.message);
          }
          setLoading(false);
        });
    } else {
      Object.keys(formData).forEach((k) => {
        setFormErrors((prev) => ({
          ...prev,
          [k]: `${fieldName[k]} is required`
        }));
      });
    }
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    compareWith: string | undefined
  ) => {
    const {
      target: { name, value }
    } = e;
    if (!value) {
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: `${fieldName[name]} is required`
      }));
    } else if (compareWith && !formData[compareWith as keyof IRegisterForm]) {
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: ""
      }));
    } else if (
      compareWith &&
      formData[compareWith as keyof IRegisterForm] &&
      formData[compareWith as keyof IRegisterForm] !== value
    ) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: `${fieldName[name]} not match with ${compareWith}`
      }));
    } else if (
      compareWith &&
      formData[compareWith as keyof IRegisterForm] &&
      formData[compareWith as keyof IRegisterForm] === value
    ) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
        [compareWith]: ""
      }));
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: ""
      }));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, files }
    } = e;
    if (!files)
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: `${fieldName[name]} is required`
      }));
    else
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: ""
      }));
    setFormData((prev) => ({
      ...prev,
      [name]: files?.[0]
    }));
  };

  return {
    handleSubmit,
    formData,
    handleInputChange,
    formErrors,
    handleFileUpload,
    loading
  };
};
