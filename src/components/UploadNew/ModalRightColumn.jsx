import React, { useState } from 'react'
import ModalUpload from './ModalUpload'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { getToken } from '../../Token/token'
import { useGetMyProfileQuery, useUploadProductMutation } from '../../redux/apiCalls/apiSlice'
import { storage } from '../../config/config'
import ImagesUpload from './ImagesUpload'
import { Link, useNavigate } from 'react-router-dom'
function ModalRightColumn({ details, setDetails }) {
    const [isUploadLoading, setIsUploadLoading] = useState(false)
    const [selectedFiles, setSelectedFile] = useState([])
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    const token = getToken()
    const { data: userProfileData } = useGetMyProfileQuery(token)
    const navigate = useNavigate()
    const [uploadProduct] = useUploadProductMutation()
    const productUploadHandler = async (details) => {
        if (details.title.length == 0 || details.modalSetting.length == 0 || details.description.length == 0 || details.category.length == 0 || !details.price || details.modal.length == 0 || details.tags.length == 0 || details.images.length == 0) {
            return toast.error("Something is missing please add it to continue")
        }
        try {
            await uploadProduct({ productDetails: details, token })
            toast.success("Model Published.");
            navigate("/")
        } catch (err) {
            toast.error(err)
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        console.log(file,'model file')
        const match = file.name.match(/\.([^.]+)$/);
        const fileEx = match ? match[1] : null;
        const fileExtension = fileEx.toLowerCase()
        console.log(file,'fileExtension')
        if (fileExtension == "zip" || file.type == "application/x-zip-compressed" || fileExtension == "psd" || fileExtension == "x3d" || fileExtension == "ai" || fileExtension == "bmp" || fileExtension == "txt" || fileExtension == "svg" || fileExtension == "dwg" || fileExtension == "dxf" || fileExtension == "step" || fileExtension == "skp" || fileExtension == "fcstd" || fileExtension == "mtl" || fileExtension == "pdf" || fileExtension == "dae" || fileExtension == "eps" || fileExtension == "f3d" || fileExtension == "sldasm" || fileExtension == "sldprt" || fileExtension == "blend" || fileExtension == "3ds" || fileExtension == "scad" || fileExtension == "fbx" || fileExtension == "obj" || fileExtension == "stl" || fileExtension == "3mf" || fileExtension == "ply" || fileExtension == "g-code" || fileExtension == "x3g" || fileExtension == "amf") {
            if (selectedFiles.length > 6) {
                return toast.error("You can only add 6 models files at a time.")
            }
            if (file) {
                setSelectedFile([...selectedFiles, file]);
            } else {
                toast.error("No File selected.")
            }
        }
        else {
            toast.error("Only file type allowed are stl, obj, 3ds, scad, gcode, 3mf, blend, sldprt, sldasm, amf, dae, eps, f3d, fcstd, mtl, pdf, ply, skp, step, dxf, dwg, svg, txt, bmp, ai, x3d, psd, zip")
        }

    }

    const uploadFileHandler = async () => {
        if (token) {
            if (userProfileData && !userProfileData.myProfile && !userProfileData.myProfile._id) {
                setIsUploadLoading(false)
                return toast.error("You are unauthorized to do that. Please login or Signup to continue.");
            }
        }
        if (!token) {
            setIsUploadLoading(false)
            return toast.error("You are unauthorized to do that. Please login or Signup to continue.");
        }
        try {
            setIsUploadLoading(true)
            if (!selectedFiles || selectedFiles.length === 0) {
                toast.error("No files selected.");
                setIsUploadLoading(false)
                return;
            }
            setFileUploadProgress(true)
            const uploadPromises = selectedFiles.map(async (file) => {
                const imageRef = ref(storage, `modal/${userProfileData && userProfileData.myProfile._id}/${file.name}`);
                try {
                    const snapshot = await uploadBytes(imageRef, file);
                    const url = await getDownloadURL(snapshot.ref);
                    return { downloadLink: url, refernceLink: imageRef.toString() };
                } catch (error) {
                    console.error("Error uploading file:", error);
                    throw error;
                }
            });
            const uploadedFiles = await Promise.all(uploadPromises);
            setFileUploadProgress(false)
            await setDetails({ ...details, modal: [...details.modal, ...uploadedFiles] });
            setIsUploadLoading(false)
            return [...uploadedFiles]
        } catch (error) {
            toast.error(error.message);
            setIsUploadLoading(false)
        }
        setIsUploadLoading(false)
    };
    return (
        <div>
            <ModalUpload selectedFiles={selectedFiles} setSelectedFile={setSelectedFile} isUploadLoading={isUploadLoading} uploadFileHandler={uploadFileHandler} setFileUploadProgress={setFileUploadProgress} fileUploadProgress={fileUploadProgress} handleFileChange={handleFileChange} details={details} setDetails={setDetails} />
            <ImagesUpload uploadFileHandler={uploadFileHandler} productUploadHandler={productUploadHandler} details={details} setDetails={setDetails} />
            <Link className='block text-[18px] mt-2' to={`/T&C`}>by uploading you <span className='text-[#0707ff]'>agree to T&C</span></Link>
            <div className='max-w-[725px]'>
                <h2 className='font-medium text-[18px] block mt-8'>COMMISSION SYSTEM</h2>
                <p className='w-full text-[18px]'>
                    You are a designer and you want to sell your 3D models optimized for 3D printing? Thanks to Kalyke you can earn money with your files STL, OBJ, CAD, 3MF, etc.! For each download, you will receive 80% of the net selling price (excluding VAT) via Stripe. Kalyke keeps 20% of commission which is used to finance bank fees (about 5%) and then all the costs related to the technical maintenance of the platform: hosting, bandwidth, accounting, email communications, translations, etc. There is no subscription system or fixed fee to pay. You sell, you win!
                    If you are still hesitating to share your models on Kalyke, feel free to read this article Why publish my designs on Kalyke? List of advantages and benefits to get an idea.
                </p>
            </div>
        </div>
    )
}

export default ModalRightColumn
