import React from 'react'

function UserStatistics({count, text}) {
  return (
    <div className='bg-white rounded-lg w-[150px] h-[120px] flex flex-col items-center justify-center p-3'>
      <div className='w-[40px] h-[40px]'>
        <img src="/images/userPic.jpg" className='rounded-full' alt="userPic" />
      </div>
      <span>{count}</span>
      <span className='text-[#686868}'>{text}</span>
    </div>
  )
}

export default UserStatistics
