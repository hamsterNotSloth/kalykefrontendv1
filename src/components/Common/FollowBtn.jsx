import React from 'react'
import { useFollowMutation, useGetMyProfileQuery } from '../../redux/apiCalls/apiSlice'
import { getToken } from '../../Token/token'
import { toast } from 'react-toastify'

function Followbtn({productDetails, style}) {
    const token = getToken()
    const {data: myProfileData} = useGetMyProfileQuery(token)
    const [follow, {isLoading}] = useFollowMutation() 
    const followUserHandler = async() => {
      let email;
      if(productDetails?.promo == "model" || productDetails?.promo == "user"){
        email = productDetails?.email
        try {
          const response = await follow({token, email: email})
          if(response.data && response.data.status == true) {
            toast.success(response.data.message)  
          }
          else {
            toast.error(response.error.data.message)
          }
        } catch(err) {
          console.log(err)
          toast.error(err.message || "Failed to follow user...")
        }
        return
      }
     else if(productDetails?.product?.created_by) {
        email = productDetails.product.created_by
      }
      else {
        email = productDetails?.email
      }
        try {
          const response = await follow({token, email: email})
          if(response.data && response.data.status == true) {
            toast.success(response.data.message)  
          }
          else {
            toast.error(response.error.data.message)
          }
        } catch(err) {
          console.log(err)
          toast.error(err.message || "Failed to follow user...")
        }
      }
      
  return (
    <>
      <button disabled={isLoading} onClick={followUserHandler} className={`${style} ${isLoading? `bg-[#6b6a6a] text-white` : `bg-[#d9d9d9]`}`}> {myProfileData?.myProfile?.following?.includes(productDetails?.user?.email || productDetails?.email) == true? "Unfollow" : "Follow"}</button>
    </>
  )
}

export default Followbtn