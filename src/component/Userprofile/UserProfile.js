import React, { useEffect } from 'react'
import UserCard from "./UserCard"
import UserStatistics from './UserStatistics'
import { faComment, faDownload, faEye, faUser } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../reusableComponent/ProductCard'
import { Token } from '../../customHooks/token'
import { useGetUserproductsQuery } from '../../redux/apiCalls/apiSlice'

function UserProfile() {
  const token = Token()
  const {data: userProducts} = useGetUserproductsQuery(token)
  
  return (
    <div className='max-w-[1200px] flex justify-between mx-auto py-7'>
      <UserCard />
      <div className='w-[100%] ml-[70px]'>
        <div className='flex mb-20 justify-between'>
          <UserStatistics count={0} text={"Followers"} icon={faUser} />
          <UserStatistics count={0} text={"Following"} icon={faUser} />
          <UserStatistics count={0} text={"Modal Views"} icon={faEye} />
          <UserStatistics count={0} text={"Downloads"} icon={faDownload} />
          <UserStatistics count={0} text={"Comments"} icon={faComment} />
        </div>
        <div className='flex flex-wrap gap-4'>
        {userProducts && userProducts.myProducts && userProducts.myProducts.map((item) => {
          return <ProductCard item={item} userProducts={userProducts} styling={"w-[230px] h-[300px]"} />
        })}
        </div>
      </div>
    </div>
  )
}        

export default UserProfile;