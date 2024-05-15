import Link from "next/link";

import Form from "../components/Form";
import Input from "../components/Input";
import { loginContainer } from "../containers/loginContainer";
import {
  buttonAttributes,
  formAttributes
} from "../description/loginForm.description";
import {
  IButtonAttributes,
  IFormAttributes
} from "../interfaces/commonInterfaces";
import { ILoginForm } from "../interfaces/loginInterface";

const LoginForm = () => {
  const { loading, formData, formErrors, handleSubmit, handleInputChange } =
    loginContainer();
  return (
    <div className="bg-white shadow-2xl rounded p-8 min-h-[280px] min-w-[400px]">
      <h2 className="text-center text-lg font-semibold mb-6">Login</h2>
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between min-h-[200px]"
        formAttributes={formAttributes}
      >
        <div className="w-full h-[100px] flex flex-col item-center justify-between">
          {formAttributes.map(({ Icon, ...obj }: IFormAttributes) => (
            <Input
              {...obj}
              key={`${obj.name}-attribute`}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${obj?.className}`}
              value={formData[obj.name as keyof ILoginForm]}
              onChange={handleInputChange}
              helper={formErrors[obj.name as keyof ILoginForm]}
              Icon={Icon}
            />
          ))}
        </div>
        <div className="flex items-center justify-between w-full">
          {buttonAttributes.map((obj: IButtonAttributes) => (
            <button
              className={`bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${obj?.className}`}
              key={`${obj.type}-btn-attr`}
              type={obj.type}
              disabled={loading}
            >
              {loading ? obj.loadingLabel || obj.label : obj.label}
            </button>
          ))}
        </div>
      </Form>
      <h6 className="text-sm mt-2">
        New to TODO list app?
        <Link href="/sign-up" className="text-sky-600 ml-1">
          Register Here
        </Link>
      </h6>
    </div>
  );
};

export default LoginForm;
