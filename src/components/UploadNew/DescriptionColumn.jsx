import React, { useState } from 'react'
import Quill from '../Common/Quil';
import { mainCartegories } from './categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useGetMyProfileQuery } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';

function DescriptionColumn({details, setDetails}) {
    const [hashtags, setHashtags] = useState([]);
    const [hashTagValue, setHashTagValue] = useState('');
    const token = getToken()
    const {data: myProfileData} = useGetMyProfileQuery(token)
    const descriptionHandler = (value) => {
        setDetails({ ...details, description: value })
    }

    const handleAddHashtag = () => {
        const hashtag = hashTagValue.replace(/\s/g, '').toLowerCase();

        if (hashtag.length > 1) {
            if (hashtags.length < 5 && !hashtags.includes(hashtag)) {
                setDetails({
                    ...details,
                    tags: [...details.tags, hashtag]
                });
                setHashTagValue('');
            }
        }
    };
    const deleteHashTagHandler = (id) => {
        const updatedHashtags = details.tags.filter((item, index) => index != id)
        setDetails({
            ...details,
            tags: updatedHashtags
        });
    }
    return (
        <div className='max-w-[900px]'>
            <div>
                <label className='text-[16px] font-semibold'>Title</label>
                <input
                    type="text"
                    placeholder="title"
                    className="w-full px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm"
                    onChange={(e) => setDetails({ ...details, title: e.target.value })}
                />
                <label>Place your keywords in the title.</label>
            </div>
            <div className='mt-3'>
                <label className='text-[16px] font-semibold'>Description</label>
                <Quill descriptionHandler={descriptionHandler} description={details.description} />
                <label>Tell the story of your creation (origin of the idea, for what use, why it’s so great…). </label>
            </div>
            <div className='mt-3'>
                <label className='text-[16px] font-semibold'>Modal Settings</label>
                <input type="text" className="w-full px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm" onChange={(e) => setDetails({ ...details, modalSetting: e.target.value })} placeholder='Copy and paste your modal settings here.' />
                <label>Specify the technical details of your creation (object size, printing time, infill…). Say whether it’s a model for FDM 3D printing, resin or both. </label>
            </div>
            <div className='mt-3'>
                <label className='text-[16px] font-semibold'>{myProfileData?.myProfile?.paymentAccountLink && "Price"}  <span className='text-[12px] font-semibold'>{myProfileData?.myProfile?.paymentAccountLink? "(Price would be calculated in terms of USD)" : "Currently your user permission only allows free model upload. Link your payment method to be verified." }</span></label>
                <input disabled={!myProfileData?.myProfile?.paymentAccountLink} type='number' min='0' onChange={(e) => { setDetails({ ...details, price: e.target.value }) }} className={`w-full px-2 h-10 border-2 rounded-sm ${!myProfileData?.myProfile?.paymentAccountLink ? 'cursor-not-allowed opacity-90 border' : 'hover:bg-gray-200 hover:border-gray-400'}`} placeholder='Enter price in USD, if you want this model to be free leave it.' />
                <label>{myProfileData?.myProfile?.paymentAccountLink && "Add price in terms of USD. Leave it if you want this product to be free."} </label>
            </div>
            <div className='mt-3'>
                <label className='text-[16px] font-semibold'>Categories</label>
                <select className='w-full px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm' value={mainCartegories} onChange={(e) => setDetails({ ...details, category: e.target.value })}>
                    <option value="">{details.category ? details.category : "Select a Category"}</option>
                    {mainCartegories.map((category, index) => (
                        <option key={category._id} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className='mt-3'>
                <label className='text-[16px] font-semibold'>Tags</label>
                <div className='flex gap-2'>
                    <input
                        type="text"
                        value={hashTagValue}
                        className='w-full px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm'
                        placeholder="Add #hashtags..."
                        onChange={e => { setHashTagValue(e.target.value) }}
                    />
                    <button onClick={handleAddHashtag} className='p-2 w-[140px] bg-[#afafaf] text-white rounded-md'>Add Hashtag</button>
                </div>
                <label>Maximum 20 tags. Example: animal, toy, low poly, math art, art toy</label>
                <div className='flex gap-5 flex-wrap'>
                    {details.tags.length == 0 ? null :
                        details.tags.map((tag, index) => {
                            return (
                                <div className='flex justify-between'>
                                    <span key={index}>{tag} </span>
                                    <button onClick={() => deleteHashTagHandler(index)} ><FontAwesomeIcon icon={faTrashCan} /></button>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div >
    )
}

export default DescriptionColumn
