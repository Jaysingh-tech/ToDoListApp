/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import classNames from "classnames";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

import { LogoutIcon } from "../assets/svgs/Icons";
import { sidebarNav } from "../description/sidebar.description";

const Sidebar = () => {
  const cookie = useCookies();
  const currentPath = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    console.log("first....");
    cookie.remove("token");
    location.replace("/login");
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="flex flex-col justify-between h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {sidebarNav.map(({ Icon, ...obj }: any, ind: number) => (
            <li key={`sidebar-menu-${ind}`}>
              <Link
                href={obj.link}
                className={classNames(
                  "flex items-center p-2 rounded-lg text-gray-400 group",
                  {
                    "bg-gray-700 hover:bg-gray-700": currentPath === obj?.link,
                    "hover:bg-gray-700": currentPath !== obj?.link
                  }
                )}
              >
                <Icon />
                <span className="ms-3">{obj?.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="flex items-center p-2 rounded-lg text-gray-400 hover:bg-gray-700"
          onClick={handleLogout}
        >
          <LogoutIcon />
          <span className="ms-3">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
