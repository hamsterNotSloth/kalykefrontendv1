import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${backendBaseUrl}/api/`,
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
      query: ({user_id:id, token}) => ({
        url: `user/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: token
        },
      }),
      providesTags: ["User"],
    }),
    getMyProfile: builder.query({
      query: (token) => ({
        url: `user/user/my-profile`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `${token}`,
        },
      }),
      providesTags: ["User"],
    }),
    signInUser: builder.mutation({
      query: (data) => ({
        url: "user/",
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
      query: (id) => ({
        url: `product//user-products/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["product", "User"],
    }),
    getMyProducts: builder.query({
      query: (token) => ({
        url: `product/my-products`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          autherization: token
        },
      }),
      providesTags: ["product", "User"],
    }),
    getproduct: builder.query({
      query: (id ) => ({
        url: `product/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["product"],
    }),
    uploadProduct: builder.mutation({
      query: ({ productDetails, token }) => ({
        url: "product/",
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
export const { useUploadProductMutation, useGetMyProductsQuery, useGetproductQuery,useGetUserproductsQuery, useGetMyProfileQuery, useUpdateUserInfoMutation, useSignInUserMutation, useForgetPasswordMutation, useResetPasswordMutation, useGetUserProfileQuery } = apiSlice;
