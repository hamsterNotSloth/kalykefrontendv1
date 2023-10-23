import React from 'react'
import UserCard from "./UserCard"
import UserStatistics from './UserStatistics'
import { faComment, faDownload, faEye, faUser } from '@fortawesome/free-solid-svg-icons'

function UserProfile() {
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
      </div>
    </div>
  )
}        

export default UserProfile;