import React, { useEffect, useState } from 'react'
import Quill from '../Common/Quil';
import { mainCartegories } from './categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useGetMyProfileQuery } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { categoryFilter } from '../Common/Categories';

function DescriptionColumn({ details, setDetails }) {
    const [hashtags, setHashtags] = useState([]);
    const [hashTagValue, setHashTagValue] = useState('');
    const [isFreeToggler, setIsFreeToggler] = useState(true)
    const token = getToken()
    const { data: myProfileData } = useGetMyProfileQuery(token)
    const descriptionHandler = (value) => {
        setDetails({ ...details, description: value })
    }
    const handleAddHashtag = async () => {
        const hashtag = hashTagValue.replace(/\s/g, '').toLowerCase();

        if (details.tags.length >= 20) {
            return toast.error("Max hashtags limit reached");
        }

        if (hashtag.length > 1) {
            if (hashtags.length < 5) {
                if (!details.tags.includes(hashtag)) {
                    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
                    if (specialCharacterRegex.test(hashtag)) {
                        return toast.error("Special characters are not allowed in hashtags");
                    }

                    setDetails({
                        ...details,
                        tags: [...details.tags, hashtag]
                    });
                    setHashTagValue('');
                } else {
                    toast.error("Hashtag already created");
                }
            } else {
                toast.error("Max hashtags limit reached");
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
    const modalSettingHandler = (value) => {
        setDetails({ ...details, modalSetting: value })
    }

    return (
        <div className='max-w-[900px] mt-8'>
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
            <div className='mt-8'>
                <label className='text-[16px] font-semibold'>Description</label>
                <Quill style={`#fff`} descriptionHandler={descriptionHandler} description={details.description} />
                <label>Tell the story of your creation (origin of the idea, for what use, why it’s so great…). </label>
            </div>
            <div className='mt-8'>
                <label className='text-[16px] font-semibold'>Model Settings</label>
                <Quill style={`#fff`} descriptionHandler={modalSettingHandler} description={details.modalSetting} />
                <label>Specify the technical details of your creation (object size, printing time, infill…). Say whether it’s a model for FDM 3D printing, resin or both. </label>
            </div>
            <div className='mt-8'>
                <div className='container mx-auto'>
                    <div className="flex items-center">
                        <label htmlFor="toggle" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="toggle"
                                    className="hidden"
                                    checked={isFreeToggler}
                                    onChange={() => { setIsFreeToggler(!isFreeToggler); { setDetails({ ...details, price: '0' }) } }}
                                />
                                <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                <div
                                    className={`toggle__dot absolute w-6 h-6 bg-white rounded-full top-[-3px] shadow inset-y-0 left-0 ${isFreeToggler ? 'transform translate-x-full bg-green-500' : ''}`}
                                ></div>
                            </div>
                            <span className='inline-block ml-4'>{isFreeToggler ? "Free" : "Paid"} </span>
                        </label>
                        {myProfileData?.myProfile?.paymentAccountLink == false && <Link to={`/user/${myProfileData?.myProfile?.u_id || `/not-found`}`} className='block text-[#f00] ml-2'>Link payment method in order to upload Paid products. Go to your profile</Link>}
                    </div>
                </div>
                {isFreeToggler &&
                    <>
                        <label className='text-[16px] font-semibold'>{myProfileData?.myProfile?.paymentAccountLink && "Price"}  <span className='text-[12px] font-semibold'>{myProfileData?.myProfile?.paymentAccountLink ? "(Price would be calculated in terms of USD)" : "Currently your user permission only allows free model upload. Link your payment method to be verified."}</span></label>
                        <input disabled={!myProfileData?.myProfile?.paymentAccountLink} type='number' min='0' onChange={(e) => { setDetails({ ...details, price: e.target.value }) }} className={`w-full px-2 h-10 border-2 rounded-sm ${!myProfileData?.myProfile?.paymentAccountLink ? 'cursor-not-allowed opacity-90 border' : 'hover:bg-gray-200 hover:border-gray-400'}`} placeholder={`${myProfileData?.myProfile?.paymentAccountLink ? 'Enter price in USD, if you want this model to be free leave it.' : 'Currently your user permission only allows free model upload. Link your payment method to be verified.'}`} />
                        <label>{myProfileData?.myProfile?.paymentAccountLink && "Add price in terms of USD. Leave it if you want this product to be free."} </label>
                        <div className='pt-3'>
                            <img src="/images/commission_logo.png" alt="commission_logo" />
                        </div>
                    </>
                }
            </div>
            <div className='mt-8'>
                <label className='text-[16px] font-semibold'>Categories</label>
                <select className='w-full px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm' value={categoryFilter} onChange={(e) => setDetails({ ...details, category: e.target.value })}>
                    <option value="">{details.category ? details.category : "Select a Category"}</option>
                    {categoryFilter.map((category, index) => (
                        <option key={category._id} value={category.categoryName}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </div>
            <div className='mt-8'>
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
            <div className="mt-8">
                <div>
                    <label htmlFor="dropdown" className='text-[16px] font-semibold'>Licenses:</label>
                    <select
                        id="dropdown"
                        className='w-full px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm'
                        value={details.license}
                        onChange={(e) => setDetails({ ...details, license: e.target.value })}
                    >
                        <option value="Kalyke - Private Use (by default)">Kalyke - Private Use (by default)</option>
                        <option value="Kalyke - Commercial Use">Kalyke - Commercial Use</option>
                        <option value="Kalyke - Commercial Use - No Derivative">Kalyke - Commercial Use - No Derivative</option>
                    </select>

                    <Link to={'/licenses'} target='_blank' className='block text-[18px] text-[#0707ff] mt-2'>Selected license: {details.license}</Link>
                </div>
            </div>
            {isFreeToggler &&
                <div className='h-[100vh] max-w-[725px] mt-8'>
                    <h1 className="text-3xl font-bold mb-4">🌐 Welcome to Kalyke!</h1>
                    <p className="mb-6">
                        The ultimate platform for designers like you to monetize your incredible 3D models optimized for 3D printing!
                        Join our thriving community and start earning money for your creative work effortlessly.
                    </p>

                    <p className="mb-6">
                        💰 With Kalyke, you earn a fantastic 80% of the net selling price (excluding VAT) for each download. We believe
                        in rewarding your talent and hard work. Say goodbye to subscription fees or fixed charges – you sell, you win,
                        simple as that!
                    </p>

                    <p className="mb-6">
                        🤝 Our transparent system ensures a fair partnership. We keep a modest 20% commission to cover essential expenses
                        such as bank fees (approximately 5%) and the technical maintenance of our platform. This includes hosting,
                        bandwidth, accounting, email communications, translations, and more.
                    </p>

                    <p className="mb-6">
                        🔐 Worried about security? Rest assured, we use the secure and reliable Stripe payment gateway to ensure you
                        receive your earnings promptly and securely.
                    </p>

                    <p className="mb-6">
                        🌟 Still undecided? Check out our article on "Why publish my designs on Kalyke?" It provides a comprehensive list
                        of advantages and benefits to give you a clearer picture of the incredible opportunities that await you on our
                        platform.
                    </p>

                    <p className="mb-6">
                        🚀 Join Kalyke today, where your creativity is valued, and your success is our priority. Start sharing your 3D
                        models and watch your earnings grow!
                    </p>
                </div>
            }
        </div >
    )
}

export default DescriptionColumn
