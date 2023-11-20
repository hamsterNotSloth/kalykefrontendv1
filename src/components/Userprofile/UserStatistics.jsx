import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { getToken } from '../../Token/token'
import { useParams } from 'react-router-dom'
import { useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice'

function UserStatistics({ count, text, icon }) {
  const token = getToken()
  const { user_id } = useParams()
  const { data: userProfile, refetch: userProfileRefetch } = useGetUserProfileQuery({ user_id, token })

  const statistics = [
    {
      title: "Followers",
      count: userProfile && userProfile.profile && userProfile.profile.followers.length || 0
    },
    {
      title: "Following",
      count: userProfile && userProfile.profile && userProfile.profile.following.length || 0
    },
    {
      title: "Total Views",
      count: userProfile && userProfile.views
    }
  ]

  useEffect(() => {
    userProfileRefetch({ user_id, token })
  }, [user_id])

  return (
    <>
    <span className='font-semibold inline-block pb-2 text-[18px]'>User Statistics:</span>
      <div className='flex mb-20 gap-2'>
      {statistics.map(item => {
        return (
          <div key={`userprofile statistics ${Math.random() * Date.now()}`} className='bg-white rounded-lg w-[150px] h-[120px] flex flex-col items-center justify-center p-3'>
            <div className='bg-[#999999] flex items-center justify-center w-[30px] h-[30px] rounded-full'>
              <FontAwesomeIcon icon={icon} className='text-white' />
            </div>
            <span>{item.count}</span>
            <span className='text-[#686868}'>{item.title}</span>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default UserStatistics;