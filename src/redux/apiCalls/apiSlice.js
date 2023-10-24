import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Token } from "../../customHooks/token";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
  //   prepareHeaders: (headers, { getState }) => {
  //     const token = Token();
  //     if (token) {
  //       headers.set('authorization', `${token}`);
  //     }
  //     return headers;
  // },
  }),
  tagTypes: ["User", "product"],
  endpoints: (builder) => ({ 
    getUserProfile: builder.query({
      query: ({token}) => ({
        url: "user/user-profile",
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `${token}`,
        },
      }),
      providesTags: ["User"],
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "user/createUser",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User", "product"],
    }),
    updateUserInfo: builder.mutation({
      query: ({newUserInfo:data,token}) => ({
        url: "user/update-user",
        method: "PATCH",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `${token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "user/reset-password-request",
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation({
      query: ({token, password}) => ({
        url: `user/reset-password/${token}`,
        method: "POST",
        body: JSON.stringify({ password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
    getUserproducts: builder.query({
      query: (token) => ({
        url: "product/my-products",
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `${token}`,
        },
      }),
      providesTags: ["product", "User"],
    }),
    getproducts: builder.query({
      query: ({ token }) => ({
        url: "product/my-products",
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `${token}`,
        },
      }),
      providesTags: ["product"],
    }),
    uploadProduct: builder.mutation({
      query: ({ productDetails, token }) => ({
        url: "product/create-product",
        method: "POST",
        body: { productDetails },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": token
        },
      }),
      invalidatesTags: ["product"],
    }),
  }),
});
export const { useUploadProductMutation, useGetUserproductsQuery, useUpdateUserInfoMutation, useSignUpMutation, useLoginUserMutation, useForgetPasswordMutation, useResetPasswordMutation, useGetUserProfileQuery } = apiSlice;
