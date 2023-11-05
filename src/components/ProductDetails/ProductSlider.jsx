import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ProductSlider({ productDetails }) {
    const [data, setData] = useState({ image: productDetails && productDetails.product.images[0].downloadLink, index: 0 });

    return (
        <>
            <div className="w-[100%] bg-[#dedede] border rounded-lg py-6  m-30">
                <div className='px-10'>
                    <div className="flex gap-[30px]">
                        <div className="max-w-[300px] h-[500px] overflow-y-auto w-[100%] md:-[484px] border-r-[1px] border-r-[#bdbdbd] pr-[25px]">
                            {productDetails && productDetails.product.images.map((img, index) => {
                                return (index < 4) ? (
                                    <div key={index} onClick={() => setData({ image: img.downloadLink, index })} className={`p-2 mb-15 max-w-[250px] w-full h-[250px] cursor-pointer ${data.image === img.downloadLink ? 'border border-blue-500' : ''}`}>
                                        <img src={img.downloadLink} alt="" className="w-full object-cover h-[100%]" />
                                    </div>
                                ) : null;
                            })}
                        </div>
                        <div className="flex-5 h-[487px] flex justify-center w-[100%]">
                            <div className="bg-white h-full overflow-hidden relative cursor-pointer">
                                <img src={data.image ? data.image : productDetails && productDetails.product.images[0].downloadLink} alt="" className="object-contain h-full" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductSlider;
