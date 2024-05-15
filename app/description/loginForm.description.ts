import { LockIcon, UserIcon } from "../assets/svgs/Icons";
import {
  IButtonAttributes,
  IFormAttributes
} from "../interfaces/commonInterfaces";

export const formAttributes: Array<IFormAttributes> = [
  {
    type: "text",
    placeholder: "Username",
    name: "email",
    Icon: UserIcon
  },
  {
    type: "password",
    placeholder: "Password",
    name: "password",
    Icon: LockIcon
  }
];

export const buttonAttributes: Array<IButtonAttributes> = [
  {
    type: "submit",
    label: "Login",
    loadingLabel: "Login..."
  }
];
