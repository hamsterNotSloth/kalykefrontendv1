// ReplyComment.js
import React, { useState } from 'react';
import { useAddReplyMutation } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { toast } from 'react-toastify';

const ReplyComment = ({ productId, commentId, onReplyAdded }) => {
  const token = getToken();
  const [reply, setReply] = useState('');
  const [addReply] = useAddReplyMutation();

  const addReplyHandler = async () => {
    if (reply.length <= 0) return toast.error("Please add your reply");
    try {
      const response = await addReply({ productId, token, commentId, reply });
      if (response && response.error) {
        toast.error(response.error?.data?.message || "Failed to add your reply, please try again.");
      } else {
        onReplyAdded(); 
      }
      setReply('');
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="ml-8 mt-2">
      <textarea
        onChange={(e) => setReply(e.target.value)}
        value={reply}
        placeholder="Add a reply..."
        className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
      />
      <div className="mt-2">
        <button onClick={addReplyHandler} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Post Reply
        </button>
      </div>
    </div>
  );
};

export default ReplyComment;
