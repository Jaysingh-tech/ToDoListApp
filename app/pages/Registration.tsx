import Link from "next/link";

import Form from "../components/Form";
import Input from "../components/Input";
import { registerContainer } from "../containers/registerContainer";
import {
  buttonAttributes,
  formAttributes
} from "../description/registration.description";
import { IButtonAttributes } from "../interfaces/commonInterfaces";
import { IRegisterForm } from "../interfaces/registerInterface";

const Registration = () => {
  const {
    loading,
    formData,
    formErrors,
    handleSubmit,
    handleFileUpload,
    handleInputChange
  } = registerContainer();

  return (
    <div className="bg-white shadow-2xl rounded p-8 min-h-[280px] min-w-[400px]">
      <h2 className="text-center text-lg font-semibold mb-6">Register</h2>
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between min-h-[200px]"
        formAttributes={formAttributes}
      >
        <div className="w-full h-auto flex flex-col item-center justify-between">
          {formAttributes.map(({ Icon, compareWith, ...obj }) => (
            <Input
              {...obj}
              key={`${obj.name}-attribute`}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${obj?.className}`}
              value={formData[obj.name as keyof IRegisterForm]}
              onChange={(e) => handleInputChange(e, compareWith)}
              helper={formErrors[obj.name as keyof IRegisterForm]}
              Icon={Icon}
            />
          ))}

          <Input
            className="file:border file:border-e-0 file:rounded-s-md file:text-gray-500 file:bg-gray-200 file:border-gray-300 file:py-2 file:px-3 file:shadow-none cursor-pointer file:cursor-pointer rounded-none rounded-e-lg rounded-s-md bg-gray-50 block flex-1 w-full text-sm shadow appearance-none border rounded w-full pr-3 !text-gray-500 leading-tight focus:outline-none focus:shadow-outline text-gray-900 border border-gray-300"
            onChange={handleFileUpload}
            helper={formErrors.profile}
            // Icon={LockIcon}
            type="file"
            placeholder="Upload profile image"
            name="profile"
          />
        </div>
        <div className="flex items-center justify-between w-full mt-2">
          {buttonAttributes.map((obj: IButtonAttributes) => (
            <button
              className={`bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${obj?.className}`}
              key={`${obj.type}-btn-attr`}
              type={obj.type}
              disabled={loading || Object.values(formErrors).some((val) => val)}
            >
              {loading ? obj.loadingLabel || obj.label : obj.label}
            </button>
          ))}
        </div>
      </Form>
      <h6 className="text-sm mt-2">
        Already have an account? please
        <Link href="/login" className="text-sky-600 ml-1">
          sign in here
        </Link>
      </h6>
    </div>
  );
};

export default Registration;
