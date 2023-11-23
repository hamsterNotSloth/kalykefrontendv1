import React from 'react'
import UserCard from "./UserCard"
import UserStatistics from './UserStatistics'
import {  faUser } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../Common/ProductCard'
import { getToken } from '../../Token/token'
import { toast } from 'react-toastify'
import { useDeleteProductMutation, useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice'
import { useParams } from 'react-router-dom'

function UserProfile({  userProducts }) {
  const token = getToken()
  const { user_id } = useParams()
  const { data: userProfile, isLoading, refetch: userProfileRefetch } = useGetUserProfileQuery({ user_id, token })
const [deleteProduct] = useDeleteProductMutation()
const productDeleteHandler = async (_id) => {
  try {
     await deleteProduct({_id, token})
  } catch(error) {
    toast.error(error.message)
  }
}
  return (
    <div className='max-w-[1200px] flex justify-between mx-auto py-7'>
      <UserCard  />
      <div className='w-[100%] ml-[70px]'>
        <UserStatistics count={0} text={"Followers"} icon={faUser} />
        <span className='font-semibold text-[18px] inline-block pb-2'>Models</span>
        <div className='flex flex-wrap gap-4'>
          {userProducts && userProducts.myProducts && userProducts.myProducts.map((item) => {
            return <div key={`Userprofile ${Math.random() * Date.now()}`}>
            <ProductCard item={item} userProducts={userProducts} styling={"w-[230px] h-[300px]"} />
            {userProfile && userProfile.permissionGranter &&<button onClick={() => {productDeleteHandler(item._id)}}>Delete</button>}
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default UserProfile;