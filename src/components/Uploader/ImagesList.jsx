import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function ImagesList({ selectedFile, fileUploadProgress, removeImageHandler }) {
    
    return (
        <>
            <ul className='pt-4'>
                <div className='text-[#ff0000]'>{selectedFile.length > 4? "Maximum limit is only 4 files per upload" : null}</div>
                {selectedFile.map((item, index) => {
                    return (
                        <li key={`ImagesList ${index * Math.random() * Date.now()}`} className='flex justify-between items-center'><span className='flex gap-2 items-center'>
                            <FontAwesomeIcon icon={faFile} />
                            <span>{item.name}</span> <span className='text-[12px]'>{fileUploadProgress? "uploading" : null}</span>
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
