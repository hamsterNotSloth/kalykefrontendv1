import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${backendBaseUrl}/api/`,
  }),
  tagTypes: ["User", "product", "descriptionProduct"],
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
    getWishListItems: builder.query({
      query: (token) => ({
        url: `user/wishlist/products`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: token
        },
      }),
      providesTags: ["descriptionProduct"],
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
    getPromotedUsers: builder.query({
      query: (token) => ({
        url: `user/promotion/users`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `${token}`,
        },
      }),
    }),
    getAllProducts: builder.query({
      query: ({filter="null", category="null"}) => ({
        url: `product/all-products?category=${encodeURIComponent(category)}&currentFilter=${filter}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    getSimilarProducts: builder.query({
      query: ({tags, created_by}) => ({
        url: `product/similar-modals?created_by=${created_by}&tags=${encodeURIComponent(tags)}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["descriptionProduct"],
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
    follow: builder.mutation({
      query: ({token, email}) => ({
        url: "user/follow",
        method: "PATCH",
        body: {email},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `${token}`,
        },
      }),
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
    }),
    getUserproducts: builder.query({
      query: (id) => ({
        url: `product//user-products/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["User"],
    }),
    getSearchedProducts: builder.query({
      query: (search) => ({
        url: `product/search/products?products=${search}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
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
      providesTags: ["descriptionProduct"],
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
      invalidatesTags: ["product", "User"],
    }),
    userViewedProduct: builder.mutation({
      query: ({ id, token }) => ({
        url: `product/${id}`,
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": token
        },
      }),
    }),
    deleteProduct: builder.mutation({
      query: ( {_id, token} ) => ({
        url: `product/delete-product`,
        method: "DELETE",
        body: {_id},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": token
        },
      }),
      invalidatesTags: ["product", "User"],
    }),
    addComments: builder.mutation({
      query:({productId, token, comment}) => ({
        url: `product/${productId}/comments`,
        method: "PATCH",
        body: {comment},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": token
        },
      }),
      invalidatesTags: ["descriptionProduct"],
    }),
    addReply: builder.mutation({
      query:({productId, token, commentId, reply}) => ({
        url: `product/${productId}/comments/${commentId}/replies`,
        method: "PATCH",
        body: {reply},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": token
        },
      }),
      invalidatesTags: ["descriptionProduct"],
    }),
    deleteComment: builder.mutation({
      query:({productId, token, comment_id}) => ({
        url: `product/${productId}/comments/${comment_id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": token
        },
      }),
      invalidatesTags: ["descriptionProduct"],
    }),
    deleteReply: builder.mutation({
      query:({productId, token, comment_id, replyId}) => ({
        url: `/product/${productId}/comments/${comment_id}/replies/${replyId}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": token
        },
      }),
      invalidatesTags: ["descriptionProduct"],
    }),
    productPurchase: builder.mutation({
      query:({productId, token}) => ({
        url: `product/${productId}/purchase`,
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": token
        },
      }),
    }),
    wishlist: builder.mutation({
      query:({productId, token}) =>({
        url: `user/wishlist`,
        method: "POST",
        body: {productId},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": token
        },
      }),
      invalidatesTags: ["descriptionProduct"],
    })
  }),
});
export const { useUploadProductMutation, useWishlistMutation, useGetWishListItemsQuery,useDeleteReplyMutation,useAddReplyMutation,useProductPurchaseMutation,useDeleteCommentMutation, useDeleteProductMutation, useAddCommentsMutation, useGetSearchedProductsQuery, useUserViewedProductMutation, useGetPromotedUsersQuery, useGetAllProductsQuery, useFollowMutation,useGetSimilarProductsQuery, useGetMyProductsQuery, useGetproductQuery,useGetUserproductsQuery, useGetMyProfileQuery, useUpdateUserInfoMutation, useSignInUserMutation, useForgetPasswordMutation, useResetPasswordMutation, useGetUserProfileQuery } = apiSlice;
