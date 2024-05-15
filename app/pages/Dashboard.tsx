/* eslint-disable no-unused-vars */
"use client";
import axios from "axios";
import Image from "next/image";
import { useCookies } from "next-client-cookies";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { setUserDetails } from "../redux-toolkit/slices/auth.slice";
import { RootState } from "../redux-toolkit/store";

const API_URL = process.env.NEXT_API_URL;

const Dashboard = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const dispatch = useDispatch();
  const cookie = useCookies();
  const token = cookie.get("token");
  useEffect(() => {
    const getProfileData = async () => {
      await axios
        .get(`${API_URL}/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        .then((resp) => {
          if (resp.data) {
            dispatch(setUserDetails(resp.data.profile));
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    };
    if (!profile && token) {
      getProfileData();
    }
  }, []);

  const handleLogout = () => {
    cookie.remove("token");
    window.location.reload();
  };

  return (
    <div>
      {/* Navbar */}

      {/* sidebar */}

      {/* Main content */}

      <div>Dashboard</div>

      {/* {profile?.filePath && (
        <div className="rounded-full p-1 border border-gray-500">
          <Image
            src={profile?.filePath}
            alt="profile-image"
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
      )}
      <div>
        Welcome {profile?.firstName} {profile?.lastName} logged in as{" "}
        {profile?.role}
      </div>
      <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Dashboard;
