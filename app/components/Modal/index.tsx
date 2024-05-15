import React from "react";

import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

const Modal = ({
  children,
  handleCancel,
  footerContent = null,
  title
}: any) => {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0.5)] flex overflow-hidden z-50 justify-center items-center w-full md:inset-0 h-full"
      onClick={handleCancel}
    >
      <div
        className="relative p-4 w-full max-w-md max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <ModalHeader title={title} handleCancel={handleCancel} />
          <ModalBody>{children}</ModalBody>
          {footerContent && <ModalFooter footer={footerContent} />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
