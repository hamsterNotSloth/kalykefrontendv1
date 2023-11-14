import React from 'react'
import UserCard from "./UserCard"
import UserStatistics from './UserStatistics'
import {  faUser } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../Common/ProductCard'

function UserProfile({  userProducts }) {

  return (
    <div className='max-w-[1200px] flex justify-between mx-auto py-7'>
      <UserCard  />
      <div className='w-[100%] ml-[70px]'>
        <UserStatistics count={0} text={"Followers"} icon={faUser} />
        <div className='flex flex-wrap gap-4'>
          {userProducts && userProducts.myProducts && userProducts.myProducts.map((item) => {
            return <ProductCard key={`Userprofile ${Math.random() * Date.now()}`} item={item} userProducts={userProducts} styling={"w-[230px] h-[300px]"} />
          })}
        </div>
      </div>
    </div>
  )
}

export default UserProfile;