import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Token } from "../../customHooks/token";

export const productApiSlice = createApi({
  reducerPath: "productApiSlice",
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
  tagTypes: ["product"],
  endpoints: (builder) => ({ 
    getproducts: builder.query({
      query: ({token}) => ({
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
        query: ({productDetails, token}) => ({
          url: "product/create-product",
          method: "POST",
          body: {productDetails},
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "authorization": token
          },
        }),
        invalidatesTags: ["product"],
      }),
  }),
});
export const { useUploadProductMutation } = productApiSlice;
