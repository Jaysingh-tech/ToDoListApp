/* eslint-disable no-unused-vars */
"use client";

import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { authPath } from "./description/common.description";
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";
import { RootState } from "./redux-toolkit/store";
import { useLocalStorage } from "./utils/custom-hooks";

const LayoutWrapper = ({ children }: any) => {
  // const [cookie, _] = useCookies();
  const cookie = useCookies();
  const isAuth = cookie.get("token");

  const renderComp = (isAuth?: any) =>
    isAuth ? (
      <div className="p-4 sm:ml-64 mt-[4rem]">{children}</div>
    ) : (
      children
    );

  useEffect(() => {
    if (isAuth && authPath.includes(location.pathname)) {
      location.replace("/dashboard");
    }
    if (!isAuth && !authPath.includes(location.pathname)) {
      location.replace("/login");
    }
  }, []);

  return (
    <>
      {isAuth && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      <main
        className={`h-auto ${
          !isAuth ? "bg-gray-100 justify-center h-screen flex items-center" : ""
        }`}
      >
        {renderComp(isAuth)}
      </main>
    </>
  );
};

export default LayoutWrapper;
