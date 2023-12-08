import React from "react";
import InputFields from "../../Common/InputFields";
import Policy from "./Policy";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/config";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
function SignupModal({ goToLoginHandler }) {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    try {
      let response = await createUserWithEmailAndPassword(auth, values.email, values.password);
      if(response.user && response.user.providerData) {
        return toast.success("Signup successfull, please login to continue!")
      }
      else {
        toast.error("Something went wrong. Have a query? Contact the support team.")
      }
    } catch (error) {
      if(error.message == "Firebase: Error (auth/email-already-in-use).") {
        return toast.error("Email already in use.")
      }
      toast.error(error.message || "An unexpected error occurred.");
    }
  };
  

  return (
    <>
      <div>
        <span className="block font-bold text-[15px] md:text-[20px] text-[#2C2C2E] mt-[20px] mb-[25px] md:mt-[25px] md:mb-[25px]">
          Create Account
        </span>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <InputFields label="Email*" type="email" name="email" />
              {errors.email && touched.email ? (
                <div className="text-[#FF0000] mb-[17px]  mt-[-16px] text-[12px]">
                  {errors.email}
                </div>
              ) : null}

              <InputFields
                label="Password*"
                type="password"
                name="password"
                errors={errors}
                touched={touched}
              />
              {errors.password && touched.password ? (
                <div className="text-[#FF0000] mb-[17px] mt-[-16px]  text-[12px]">
                  {errors.password}
                </div>
              ) : null}

              <InputFields
                label="Confirm Password*"
                type="password"
                name="confirmPassword"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="text-[#FF0000] mb-[17px]  mt-[-16px]  text-[12px]">
                  {errors.confirmPassword}
                </div>
              ) : null}

              <button
                type="submit"
                className="py-[8px] w-full bg-[#1DA1F2]  mb-[15px] rounded-lg flex items-center justify-center text-[#fff] font-semibold text-[19px] hover:bg-[#5EC1FF] transition duration-300 ease-in-out"
              >
                Sign up
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex gap-2">
          <span>Already Have an account?</span>
          <button className="text-[#007BC7]" onClick={goToLoginHandler}>Sign in.</button>
        </div>
        <Policy />
      </div>
    </>
  );
}

export default SignupModal;
