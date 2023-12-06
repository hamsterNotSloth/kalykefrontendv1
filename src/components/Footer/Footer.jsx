import React, { useEffect, useState } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialMedia } from './socialMedia';
import SocialMediaRow from '../Common/SocialMediaRow';

function Footer() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 100;

      setIsFixed(scrollY > triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`bg-white p-3 px-6 flex justify-between border-t-[1px] rounded-t-lg mx-5 shadow-md items-center h-[50px] ${isFixed ? 'fixed bottom-0 left-0 right-0 z-50' : ''}`}>
      <div>
        <a
          href='https://ko-fi.com/kalyke'
          className='bg-[#29abe0] text-white px-2 py-1 rounded-sm flex items-center justify-center gap-2'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon className='text-[#e91313]' icon={faHeart} /> Support kalyke
        </a>
      </div>
      <div>
        <ul className='flex gap-3 w-[400px] justify-end items-center'>
          {socialMedia.map((item) => (
            <SocialMediaRow key={`social-media-footer-${item.link}`} item={item} />
          ))}
        </ul>
      </div>
      <div>
        <ul className='flex max-w-[480px] justify-end gap-3'>
          <li>Terms & Conditions</li>
          <li>Support</li>
          <li>Feedback</li>
          <li>Report Model</li>
          <li>Privacy</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
