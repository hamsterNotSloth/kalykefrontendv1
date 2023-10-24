import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function UserStatistics({count, text, icon}) {
  return (
    <div className='bg-white rounded-lg w-[150px] h-[120px] flex flex-col items-center justify-center p-3'>
      <div className='bg-[#999999] flex items-center justify-center w-[30px] h-[30px] rounded-full'>
      <FontAwesomeIcon icon={icon} className='text-white'/>
      </div>
      <span>{count}</span>
      <span className='text-[#686868}'>{text}</span>
    </div>
  )
}

export default UserStatistics;