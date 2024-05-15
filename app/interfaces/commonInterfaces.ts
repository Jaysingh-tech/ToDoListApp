/* eslint-disable no-unused-vars */
import { ChangeEvent, FormEvent } from "react";

export interface IForm {
  children: React.ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
  formAttributes: Array<IFormAttributes>;
}

export interface IFormAttributes {
  type: string;
  className?: string;
  placeholder?: string;
  name: string;
  Icon?: any;
  compareWith?: string;
}

export interface IButtonAttributes {
  type: "submit" | "button" | "reset";
  label: string;
  className?: string;
  loadingLabel?: string;
}

export interface IInput {
  type: string;
  placeholder?: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  className?: string;
  key?: string;
  helper?: string;
  Icon?: any;
}
