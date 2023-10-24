import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {  useLoginUserMutation } from "../../../redux/apiCalls/apiSlice";
import InputFields from "../../ReUsableComponent/InputFields";
import { toast } from "react-toastify";
import { Token } from "../../../customHooks/token";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function LoginFields() {
  const [loginUser] = useLoginUserMutation();
  const token = Token()
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await loginUser({values, source: "Email"});
      if(response.data && response.data.token.status == true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.error.data.message);
      }
      localStorage.setItem("userToken", response.data.token.token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
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
                text="Forget Password"
                type="password"
                name="password"
              />
              {errors.password && touched.password ? (
                <div className="text-[#FF0000] mb-[17px] mt-[-16px]  text-[12px]">
                  {errors.password}
                </div>
              ) : null}

              <button
                type="submit"
                className="py-[8px] w-full bg-[#1DA1F2]  mb-[15px] rounded-lg flex items-center justify-center text-[#fff] font-semibold text-[19px] hover:bg-[#5EC1FF] transition duration-300 ease-in-out"
              >
                Log in
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default LoginFields;
