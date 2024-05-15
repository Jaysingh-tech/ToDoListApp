import React from "react";

const ModalFooter = ({ footer = null }: any) => {
  return (
    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
      {footer}
    </div>
  );
};

export default ModalFooter;
