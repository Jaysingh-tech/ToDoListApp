import React from "react";

import { IForm } from "../interfaces/commonInterfaces";

const Form = ({ children, onSubmit, className }: IForm) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};

export default Form;
