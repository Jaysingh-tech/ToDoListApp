import {
  EmailIcon,
  LockIcon,
  UserIcon,
  UsernameIcon
} from "../assets/svgs/Icons";
import {
  IButtonAttributes,
  IFormAttributes
} from "../interfaces/commonInterfaces";

export const formAttributes: Array<IFormAttributes> = [
  {
    type: "text",
    placeholder: "First name (e.g. Jhonny)",
    name: "firstName",
    Icon: UserIcon
  },
  {
    type: "text",
    placeholder: "Last name (e.g. Deo)",
    name: "lastName",
    Icon: UserIcon
  },
  {
    type: "text",
    placeholder: "Email address",
    name: "email",
    Icon: EmailIcon
  },
  {
    type: "text",
    placeholder: "Username (e.g. jhonnydeo123)",
    name: "username",
    Icon: UsernameIcon
  },
  {
    type: "password",
    placeholder: "Password",
    name: "password",
    Icon: LockIcon,
    compareWith: "confirmPassword"
  },
  {
    type: "password",
    placeholder: "Confirm your password",
    name: "confirmPassword",
    Icon: LockIcon,
    compareWith: "password"
  }
];

export const buttonAttributes: Array<IButtonAttributes> = [
  {
    type: "submit",
    label: "Sign up",
    loadingLabel: "Signing up..."
  }
];
