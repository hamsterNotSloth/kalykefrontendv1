import React from 'react'
import UserCard from "./UserCard"
import UserStatistics from './UserStatistics'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../Common/ProductCard'
import { getToken } from '../../Token/token'
import { toast } from 'react-toastify'
import { useDeleteProductMutation, useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

function UserProfile({ userProducts }) {
  const token = getToken()
  const { user_id } = useParams()
  const { data: userProfile } = useGetUserProfileQuery({ user_id, token })
  const [deleteProduct] = useDeleteProductMutation()
  const productDeleteHandler = async (_id) => {
    try {
      const response = await deleteProduct({ _id, token })
      if(response && response.error) {
        toast.error(response.error.data?.message)
      }
      if(response?.data) {
        toast.success(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const removeHtmlTags = (htmlString) => {
    const regex = /(<([^>]+)>)/gi;
    return htmlString.replace(regex, '');
  };
  const cleanDescription = userProfile?.profile?.description ? removeHtmlTags(userProfile?.profile?.description) : '';
  return (
    <div className='max-w-[1200px] flex justify-between mx-auto py-7'>
      <Helmet>
        <title>{`Kalyke - ${userProfile?.profile?.userName}`}</title>
        <meta name="description" content={cleanDescription} />
        <meta property="og:title" content= { `Kalyke - ${userProfile?.profile?.userName}`} />
        <meta property="og:description" content={cleanDescription} />
      </Helmet> 
      <UserCard />
      <div className='w-[100%] h-[100vh] ml-[70px]'>
        <UserStatistics count={0} text={"Followers"} icon={faUser} />
        <span className='font-semibold text-[18px] inline-block pb-2'>Models</span>
        <div className='flex flex-wrap  pb-[40px] gap-4'>
          {userProducts && userProducts.myProducts && userProducts.myProducts.map((item) => {
            return <ProductCard key={`Userprofile ${Math.random() * Date.now()}`} item={item} deletePermission={userProfile?.permissionGranter || false} productDeleteHandler={productDeleteHandler} userProducts={userProducts} styling={"w-[230px] h-[300px]"} />
              {/* {userProfile && userProfile.permissionGranter && <button onClick={() => { productDeleteHandler(item._id) }}>Delete</button>} */}
          })}
        </div>
      </div>
    </div>
  )
}

export default UserProfile;