/* eslint-disable no-unused-vars */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

import { MenuCloseIcon, MenuOpenIcon } from "../assets/svgs/Icons";
import appLogo from "../favicon.ico";
import { RootState } from "../redux-toolkit/store";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const profileData = useSelector((state: RootState) => state?.auth?.profile);
  const handleSidebarToggle = () => {
    setToggle((prev: boolean) => !prev);
  };
  const handleProfileToggle = () => {
    setProfileToggle((prev: boolean) => !prev);
  };
  return (
    <div className="fixed top-0 z-50 w-full border-b border-gray-200 bg-gray-800 border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:transition focus:ease-in-out focus:delay-150 focus:duration-300 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={handleSidebarToggle}
            >
              {toggle ? <MenuOpenIcon /> : <MenuCloseIcon />}
            </button>
            <Link href="https://flowbite.com" className="flex ms-2 md:me-24">
              <Image
                src={appLogo}
                className="h-8 me-3"
                alt="FlowBite Logo"
                width={30}
                height={50}
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                TODO List
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="flex items-center ms-3">
              {/* Profile button */}
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                  onClick={handleProfileToggle}
                >
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={profileData?.filePath}
                    alt="user photo"
                    width={50}
                    height={50}
                  />
                </button>
              </div>
              {/* Profile dropdown menu */}
              <div
                className={`z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                id="dropdown-user"
              >
                <div className="px-4 py-3">
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
                    Neil Sims
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul className="py-1">
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Earnings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
