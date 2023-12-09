import React from 'react'
import { Link } from 'react-router-dom'

const CompanyLogo = () => {
    return (
    <Link to="/" className='w-[50px] flex flex-col items-end h-[50px]'>
        <img src="/images/logo.png" className='w-full rounded-md h-full' alt="logo" />
        <span className='text-[12px]'>Beta</span>
    </Link>
  )
}

export default CompanyLogo
