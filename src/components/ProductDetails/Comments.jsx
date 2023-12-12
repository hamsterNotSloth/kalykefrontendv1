import React, { useEffect, useState } from 'react'
import { useAddCommentsMutation, useDeleteCommentMutation, useDeleteReplyMutation, useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice'
import { getToken } from '../../Token/token'
import { toast } from 'react-toastify'
import ReplyComment from './ReplyComment'
import { Link } from 'react-router-dom'

const Comments = ({ productDetails }) => {
  const token = getToken()
  const [comment, setComment] = useState('')
  const [addComments, {isLoading: isAddingComment}] = useAddCommentsMutation()
  const [deleteComment, {isLoading: isCommentDeleting}] = useDeleteCommentMutation()
  const [deleteReply, {isLoading: isReplyDeleting}] = useDeleteReplyMutation();
  const [replyTo, setReplyTo] = useState(null);
  const deleteCommentHandler = async (comment_id) => {
    try {
      const response = await deleteComment({ productId: productDetails?.product._id, token, comment_id })
      if (response && response.error) {
        return toast.error(response.error.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const addCommentsHandler = async () => {
    if (comment.length <= 0) return toast.error("Please add your comment")
    try {
      const response = await addComments({ productId: productDetails?.product._id, token, comment })
      if (response && response.error) {
        toast.error(response.error?.data?.message || "Failed to add your comment, please try again.")
      }
      setComment('')
    } catch (error) {
      toast.error(error.message || "Something went wrong!")
    }
  }

  const commentHandler = (e) => {
    setComment(e.target.value)
  }

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${day}-${month}-${year}`;
  }

const deleteReplyHandler = async (data) => {
  const {productId, token, comment_id,replyId} = data
  try {
    const response = await deleteReply({
      productId,
      token,
      comment_id,
      replyId
    });

    if (response.error) {
      toast.error(response.error.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  const replyHandler = (commentId) => {
    setReplyTo(commentId);
  };
  return (
    <div className='py-8'>
      <span className='flex pb-3 font-semibold'>Comments</span>
      <div className='pb-2'>
        <div className="flex items-center mb-4 mt-4">
          <textarea onChange={commentHandler} value={comment} placeholder="Add a comment..." className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"></textarea>
          <button onClick={addCommentsHandler} disabled={isAddingComment} className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">{isAddingComment? "Processing" : "Post"}</button>
        </div>
      </div>
      <ul>
        {productDetails.product.comments?.map((item, index) => {
          return <li className=' pb-3' key={`Comment ${index} ${item._id}`}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <img src={item.profilePic} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className='flex gap-1 items-end'>
                    <Link to={`user/${item.u_id}`} className="font-bold text-gray-800">{item.userName}</Link> <span className='text-[12px]'>{formatDate(item.createdAt)}</span>
                    </div>
                    <div className="ml-auto">
                      <button className="text-gray-500 hover:text-blue-500 mr-2" onClick={() => replyHandler(item._id)}>Reply</button>
                      <button className="text-red-500 hover:text-red-700" disabled={isCommentDeleting} onClick={() => deleteCommentHandler(item._id)}>Delete</button>
                    </div>
                  </div>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              </div>
            </div>
            {replyTo === item._id && (
              <ReplyComment
                productId={productDetails?.product._id}
                commentId={item._id}
                onReplyAdded={() => setReplyTo(null)}
              />
            )}
            {item.replies?.map((reply, replyIndex) => (
              <div key={`Reply ${replyIndex} ${reply._id}`} className="bg-white p-4 mt-4 rounded-lg shadow-md ml-8">
                <div className="flex items-center mb-2">
                  <img src={reply.profilePic} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                    <div className='flex gap-1 items-end'>
                    <Link to={`user/${item.u_id}`} className="font-bold text-gray-800">{reply.userName}</Link>  <span className='text-[12px]'>{formatDate(item.createdAt)}</span>
                    </div>
                      <div className="ml-auto">
                        <button className="text-gray-500 hover:text-blue-500 mr-2" onClick={() => replyHandler(reply._id)}>Reply</button>
                        <button className="text-red-500 hover:text-red-700" disabled={isReplyDeleting} onClick={() => deleteReplyHandler({productId: productDetails?.product._id, token, comment_id:item._id, replyId: reply._id })}>Delete</button>
                      </div>
                    </div>
                    <p className="text-gray-600">{reply.text}</p>
                  </div>
                </div>
                {replyTo === reply._id && (
                  <ReplyComment
                    productId={productDetails?.product._id}
                    commentId={item._id}
                    onReplyAdded={() => setReplyTo(null)}
                  />
                )}
              </div>
            ))}
          </li>
        })}
      </ul>
    </div>
  )
}

export default Comments
