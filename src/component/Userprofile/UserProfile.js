import React from 'react'
import UserCard from "./UserCard"
import UserStatistics from './UserStatistics'
import ImageDropbox from './ImageDropbox'
function UserProfile() {
  return (
    <div className='max-w-[1200px] flex justify-between mx-auto py-7'>
      <UserCard />
      <div className='w-[100%] ml-[70px]'>
        <div className='flex mb-20 justify-between'>
          <UserStatistics count={0} text={"Followers"} />
          <UserStatistics count={0} text={"Following"} />
          <UserStatistics count={0} text={"Modal Views"} />
          <UserStatistics count={0} text={"Downloads"} />
          <UserStatistics count={0} text={"Comments"} />
        </div>
        <ImageDropbox />
      </div>
    </div>
  )
}        

export default UserProfile;