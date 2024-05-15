import classNames from "classnames";
import { useState } from "react";

import { CloseEyeIcon, OpenEyeIcon } from "../assets/svgs/Icons";
import { IInput } from "../interfaces/commonInterfaces";

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  className,
  helper,
  Icon
}: IInput) => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  return (
    <>
      {Icon ? (
        <div className="flex my-2">
          <span
            className={classNames(
              "inline-flex items-center px-3 border border-e-0 rounded-s-md",
              {
                "text-gray-500 bg-gray-200 border-gray-300": !helper,
                "text-red-900 bg-red-200 border-red-500": helper
              }
            )}
          >
            <Icon />
          </span>
          <input
            {...{
              type: type === "password" && togglePassword ? "text" : type,
              placeholder,
              name,
              value,
              onChange
            }}
            className={classNames(
              `rounded-none bg-gray-50 block flex-1 w-full text-sm`,
              className,
              {
                "border border-red-500 text-red-900 placeholder-red-500  focus:shadow-red-500/50 focus:border-red-500 block w-full":
                  helper,
                "text-gray-900 border border-gray-300": !helper
              }
            )}
          />
          {type === "password" && (
            <button
              type="button"
              className={classNames(
                "rounded-none rounded-e-lg focus:ring-2 focus:outline-none font-medium text-sm p-2.5 text-center inline-flex items-center",
                {
                  "text-red-900 bg-red-200 border-red-500 border hover:text-red-500 focus:border-red-500 focus:ring-red-300":
                    helper,
                  "text-gray-900 border border-gray-300 hover:text-gray-500 bg-gray-200 hover:bg-gray-200 focus:ring-gray-300":
                    !helper
                }
              )}
              onClick={() => {
                setTogglePassword((prev: any) => !prev);
              }}
            >
              {!togglePassword ? <CloseEyeIcon /> : <OpenEyeIcon />}
            </button>
          )}
        </div>
      ) : (
        <>
          <input
            {...{
              type,
              placeholder,
              name,
              value,
              onChange
            }}
            className={classNames(
              `shadow appearance-none rounded w-full my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`,
              className,
              {
                "s:bordborder border-red-500 text-red-900 placeholder-red-500 focus:shadow-red-500/50 focuer-red-500 block w-full p-2.5":
                  helper
              }
            )}
          />
          {type === "password" && (
            <button
              type="button"
              className={classNames(
                "rounded-none rounded-e-lg focus:ring-2 focus:outline-none font-medium text-sm p-2.5 text-center inline-flex items-center",
                {
                  "text-red-900 bg-red-200 border-red-500 border hover:text-red-500 focus:border-red-500 focus:ring-red-300":
                    helper,
                  "text-gray-900 border border-gray-300 hover:text-gray-500 bg-gray-200 hover:bg-gray-200 focus:ring-gray-300":
                    !helper
                }
              )}
              onClick={() => {
                setTogglePassword((prev: any) => !prev);
              }}
            >
              {!togglePassword ? <CloseEyeIcon /> : <OpenEyeIcon />}
            </button>
          )}
        </>
      )}
      <span className="text-red-500 text-sm min-h-5">{helper}</span>
    </>
  );
};

export default Input;
