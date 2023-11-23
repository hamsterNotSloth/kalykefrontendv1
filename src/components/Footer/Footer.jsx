import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  const thangsSocialMedias = [
    {
      icon: faInstagram,
      link: "/"
    },
    {
      icon: faLinkedin,
      link: "/"
    },
    {
      icon: faFacebook,
      link: "/"
    }
  ]
  return (
    <div className='fixed left-0 right-0 bottom-0 bg-white z-50 flex flex-col items-center justify-center py-3'>
      <a href="https://ko-fi.com/kalyke" target="_blank"><FontAwesomeIcon className='text-[#e91313]' icon={faHeart} /> Support kalyke</a>
      <div>
        <span>Follow us on</span>
        <ul className='flex justify-center gap-3 items-center'>
          {thangsSocialMedias.map((item, index) => {
            return (
              <li key={`footersocialrow-1 index ${Math.random() * Date.now()}`}>
                <a href={item.link}><FontAwesomeIcon icon={item.icon} /></a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Footer
