import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function SocialMediaRow({item, copyToClipboard}) {
    const handleClick = () => {
        copyToClipboard(); 
        window.open(item.link, '_blank', 'width=600,height=400');
      };
    return (
        <li ><button onClick={handleClick}>
            <FontAwesomeIcon icon={item.icon} />
        </button></li>
    )
}

export default SocialMediaRow
