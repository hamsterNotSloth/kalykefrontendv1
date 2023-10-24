import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function ImagesList({ selectedFile, removeImageHandler }) {
    return (
        <>
            <span className='text-[21px] font-semibold mb-2'>File</span>
            <ul>
                {selectedFile.map((item, index) => {
                    return (
                        <li key={Math.random() * 0.901 % 1.61} className='flex justify-between items-center'><span className='flex gap-2 items-center'>
                            <FontAwesomeIcon icon={faFile} />
                            <span>{item.name}</span>
                        </span>
                            <button onClick={()=>removeImageHandler(index)}><FontAwesomeIcon icon={faTrashCan} /></button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default ImagesList
