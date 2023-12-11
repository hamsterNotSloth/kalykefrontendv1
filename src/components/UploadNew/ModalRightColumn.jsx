import React, { useState } from 'react'
import ModalUpload from './ModalUpload'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { getToken } from '../../Token/token'
import { useGetMyProfileQuery, useUploadProductMutation } from '../../redux/apiCalls/apiSlice'
import { storage } from '../../config/config'
import ImagesUpload from './ImagesUpload'
import { Link } from 'react-router-dom'
function ModalRightColumn({ details, setDetails }) {
    const [isUploadLoading, setIsUploadLoading] = useState(false)
    const [selectedFiles, setSelectedFile] = useState([])
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    const token = getToken()
    const { data: userProfileData } = useGetMyProfileQuery(token)

    const [uploadProduct] = useUploadProductMutation()
    const productUploadHandler = async (details) => {
        if (details.title.length == 0 || details.modalSetting.length == 0 ||  details.description.length == 0 || details.category.length == 0 || !details.price || !details.modal || !details.tags || !details.images) {
            return toast.error("Something is missing please add it to continue")
        }
        try {
            await uploadProduct({ productDetails: details, token })
            toast.success("Model Published.");
        } catch (err) {
            toast.error(err)
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        const match = file.name.match(/\.([^.]+)$/);
        const fileEx = match ? match[1] : null;
        const fileExtension = fileEx.toLowerCase()
        if (file.type == "zip" || file.type == "application/x-zip-compressed" ||  fileExtension == "psd" || fileExtension == "x3d" || fileExtension == "ai" || fileExtension == "bmp" || fileExtension == "txt" || fileExtension == "svg" || fileExtension == "dwg" || fileExtension == "dxf" || fileExtension == "step" || fileExtension == "skp" || fileExtension == "fcstd" || fileExtension == "mtl" || fileExtension == "pdf" || fileExtension == "dae" || fileExtension == "eps" || fileExtension == "f3d" || fileExtension == "sldasm" || fileExtension == "sldprt" || fileExtension == "blend" || fileExtension == "3ds" || fileExtension == "scad" || fileExtension == "fbx" || fileExtension == "obj" || fileExtension == "stl" || fileExtension == "3mf" || fileExtension == "ply" || fileExtension == "g-code" || fileExtension == "x3g" || fileExtension == "amf") {
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
            <a className='block text-[18px] mt-2' href={'https://docs.google.com/document/d/1BG0-q_IAsCRgQESYfQLj0s1G1U1oc_9WqqEJ9u2x4io/edit#heading=h.2zqx1nsy4bnz'} rel="noopener noreferrer" target='_blank'>by uploading you <span className='text-[#0707ff]'>agree to T&C</span></a>
        </div>
    )
}

export default ModalRightColumn
