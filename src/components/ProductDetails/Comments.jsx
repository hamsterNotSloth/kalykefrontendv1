import React, { useState } from 'react'
import Quill from '../Common/Quil'
import { useAddCommentsMutation, useDeleteCommentMutation } from '../../redux/apiCalls/apiSlice'
import { getToken } from '../../Token/token'
import { toast } from 'react-toastify'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Comments = ({ productDetails }) => {
  const token = getToken()
  const [comment, setComment] = useState('')
  const [commentOptions, setCommentOptions] = useState([]); 
  const [addComments] = useAddCommentsMutation()
  const [deleteComment] = useDeleteCommentMutation()


  const deleteCommentHandler = async(comment_id) => {
    try {
      const response = await deleteComment({ productId: productDetails?.product._id, token, comment_id })
      console.log(response,'response')
      if(response && response.error) {
        return toast.error(response.error.data.message)
      }
    } catch(error) {
      toast.error(error.message)
    }
  }

  const addCommentsHandler = async () => {
    if (comment.length <= 0) return toast.error("Please add your comment")
    try {
      const response = await addComments({ productId: productDetails?.product._id, token, comment })
      if (response && response.error) {
        toast.error(response.error.data.message)
      }
      setComment('')
    } catch (error) {
      toast.error(error.message || "Something went wrong!")
    }
  }

  const commentHandler = (text) => {
    setComment(text)
  }

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const toggleOptions = (index) => {
    setCommentOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = !newOptions[index];
      for (let i = 0; i < newOptions.length; i++) {
        if (i !== index) {
          newOptions[i] = false;
        }
      }

      return newOptions;
    });
  };
  
  return (
    <div className='py-8'>
      <div className='pb-2'>
        <Quill descriptionHandler={commentHandler} description={comment} />
        <button onClick={addCommentsHandler} className='px-2 py-1 bg-slate-500 rounded-sm text-white'>Add your thought</button>
      </div>
      <ul>
        {productDetails.product.comments?.map((item, index) => {
          return <li className=' pb-3' key={`Comment ${index} ${item._id}`}>
            <div className='border-b-1 border-b-black flex items-end gap-2'>
              <span>{index + 1}-</span> <div dangerouslySetInnerHTML={{ __html: item.text }} /> <span className='text-[12px]'>Created_At: {formatDate(productDetails.product.createdAt)}</span>
            <div>
              <button onClick={() => toggleOptions(index)} className='relative flex items-center'><FontAwesomeIcon icon={faEllipsis} /></button>
              {commentOptions[index] && (
                <div className={`absolute z-50 bg-white rounded p-1`}>
                  <button onClick={() => deleteCommentHandler(item._id)}>Delete</button>
                </div>
              )}
            </div>
            </div>
          </li>
        })}
      </ul>
    </div>
  )
}

export default Comments
