import React from "react";

const Button = ({
  children,
  type,
  btnType,
  btnText,
  handleClick,
  btnIcon
}: any) => {
  console.log({
    children,
    type,
    btnType,
    btnText,
    handleClick,
    btnIcon
  });
  const getTypeStyle = (type: any) => {
    switch (type) {
      case "primary":
        return "text-white bg-blue-700 hover:bg-blue-900 focus:ring-blue-300";
      case "secondary":
        return "border border-gray-700 text-gray-400 bg-gray-700 hover:text-black hover:bg-white focus:ring-gray-300";
      default:
        return "border border-gray-700 text-black bg-white hover:bg-gray-700 hover:text-gray-400 focus:ring-gray-300";
    }
  };
  return (
    <button
      type={type}
      className={`inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${getTypeStyle(
        btnType
      )}`}
      onClick={handleClick}
    >
      {btnIcon}
      {btnText}
      {children}
    </button>
  );
};

export default Button;
