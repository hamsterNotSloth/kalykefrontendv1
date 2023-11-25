import React from 'react'
import { Link } from 'react-router-dom'

const CompanyLogo = () => {
    return (
    <Link to="/" className='w-[50px] h-[50px]'>
        <img src="/images/logo.png " className='w-full h-full' alt="logo" />
    </Link>
  )
}

export default CompanyLogo
