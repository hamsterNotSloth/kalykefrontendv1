import React, { useState } from "react";
import InputFields from "../../reusableComponent/InputFields";
import Policy from "./Policy";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSignUpMutation } from "../../../redux/apiCalls/apiSlice";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
function SignupModal({goToLoginHandler}) {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [signUp] = useSignUpMutation();

  const handleSubmit = async (values) => {
    try {
      let response = await signUp(values);
      console.log("cre", response);
      if(response.data && response.data.status == true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      localStorage.setItem("userToken", response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <span className="block  font-bold text-[15px] md:text-[20px] text-[#2C2C2E]  mt-[20px]  mb-[25px]  md:mt-[25px]  md:mb-[25px]">
          Create Account
        </span>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <InputFields label="Username*" type="text" name="username" />
              {errors.username && touched.username ? (
                <div className="text-[#FF0000] mb-[17px]  mt-[-16px]  text-[12px]">
                  {errors.username}
                </div>
              ) : null}

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
