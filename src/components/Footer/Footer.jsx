import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { socialMedia } from './socialMedia';
import SocialMediaRow from '../Common/SocialMediaRow';

function Footer() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 200;

      setIsFixed(scrollY > triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={` bottom-0 left-0 right-0 bg-white p-3 flex justify-between items-center z-50 ${isFixed ? 'sticky' : ''}`}>
      <div>
        <a href='https://ko-fi.com/kalyke' className='bg-[#29abe0] text-white px-2 py-1 rounded-sm flex items-center justify-center gap-2' target='_blank' rel='noopener noreferrer'>
          <FontAwesomeIcon className='text-[#e91313]' icon={faHeart} /> Support kalyke
        </a>
      </div>
      <div>
        <span>Follow us on</span>
        <ul className='flex gap-3 items-center'>
        {socialMedia.map(item => {
            return (
              <SocialMediaRow item={item} key={`social-media-footer ${item.link} ${Math.random() * Date.now()}`} />
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default Footer;
