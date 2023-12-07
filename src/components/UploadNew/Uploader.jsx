import React, { useEffect, useState } from 'react'
import DescriptionColumn from './DescriptionColumn'
import ModalRightColumn from './ModalRightColumn'
function Uploader() {
    const [details, setDetails] = useState({
        title: '',
        description: '',
        category: null,
        modalSetting: '',
        price: 0,
        modal: [],
        tags: [],
        images: []
    });

    return (
        <div className='pb-9  p-4 max-w-[1500px] mx-auto'>
            <h2 className='text-[30px] font-semibold'>Created Something</h2>
            <div className=' gap-10 flex h-[100vh]'>
                <DescriptionColumn details={details} setDetails={setDetails} />
                <ModalRightColumn details={details} setDetails={setDetails} />
            </div>
        </div>
    )
}

export default Uploader
