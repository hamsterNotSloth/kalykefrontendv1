import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {  useSignInUserMutation } from "../../../redux/apiCalls/apiSlice";
import InputFields from "../../Common/InputFields";
import { toast } from "react-toastify";
import { auth } from "../../../config/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function LoginFields() {
  const [signInUser] = useSignInUserMutation();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const firebaseAuth = await signInWithEmailAndPassword(auth, values.email, values.password)
      if(firebaseAuth.user && firebaseAuth.user.providerData) {
        const response = await signInUser({credential: firebaseAuth.user, source: "Email"});
        if(response.data && response.data.userData.status == true) {
         localStorage.setItem("userToken", response.data.userData.token);
          toast.success("Login Successfull");
        } else {
          toast.error(response.error.data.message);
        }
      }
    } catch (error) {
      if(error.message === "Firebase: Error (auth/invalid-login-credentials).") {
        return toast.error("Invalid Credentials.")
      }
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
