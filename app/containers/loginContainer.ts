import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { ILoginForm } from "../interfaces/loginInterface";
import { setUserDetails } from "../redux-toolkit/slices/auth.slice";

/* Change the type */
const fieldName: any = {
  email: "Username",
  password: "Password"
};

const API_URL = process.env.NEXT_API_URL;

export const loginContainer = () => {
  const [formData, setFormData] = useState<ILoginForm>({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState<ILoginForm>({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [, setCookie] = useCookies();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (Object.values(formData).every((val) => val)) {
        setLoading(true);
        await axios
          .post(`${API_URL}/login`, formData, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((resp) => {
            if (resp.data.token) {
              setCookie("token", resp.data.token);
              dispatch(setUserDetails(resp.data.profile));
              location.replace("/dashboard");
            }
            setLoading(false);
          })
          .catch(({ response }) => {
            if (
              response?.data?.error &&
              response?.data?.error?.field &&
              response?.data?.message
            ) {
              setFormErrors((prev) => ({
                ...prev,
                [response?.data?.error?.field]: response?.data?.message
              }));
            } else {
              toast.error("Something went wrong!");
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
    } catch {
      toast.error("Something went wrong");
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;
    if (!value) {
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: `${fieldName[name]} is required`
      }));
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: ""
      }));
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return { loading, formData, formErrors, handleSubmit, handleInputChange };
};
