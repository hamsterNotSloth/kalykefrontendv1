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
        try {
            const response = await uploadProduct({ productDetails: details, token })
            if (response) {
                toast.success(response.data.message)
                
            }
        } catch (err) {
            toast.error(err)
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        console.log(file,'file')
        const match = file.name.match(/\.([^.]+)$/);
        const fileEx = match ? match[1] : null;
        const fileExtension = fileEx.toLowerCase()
        console.log(fileExtension,'fileExtension')
        if( file.type == "application/x-zip-compressed" || fileExtension == "fbx" || fileExtension == "obj"  || fileExtension == "stl" || fileExtension == "3mf" || fileExtension == "ply" || fileExtension == "g-code" || fileExtension == "x3g"  || fileExtension == "amf" ) {
            if (selectedFiles.length > 4) {
                return toast.error("You can only add 6 models files")
            }
            if (file) {
                setSelectedFile([...selectedFiles, file]);
            } else {
                toast.error("No File selected.")
            }
        }
        else {
            toast.error("Only file type allowed are fbx, obj, stl, 3mf, ply, g-code, x3g, amf, zip")
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
            <ImagesUpload uploadFileHandler={uploadFileHandler} productUploadHandler={productUploadHandler}  details={details} setDetails={setDetails} />
            <Link className='block text-[18px] mt-2' to='/licenses' target='_blank'>By uploading your model you accept our <span className='text-[#0707ff]'>Licenses</span></Link>
        </div>
    )
}

export default ModalRightColumn
