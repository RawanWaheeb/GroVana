// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import axios from "axios";
// import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

// const Post = ({ post }) => {
//   const [comments, setComments] = useState(post.comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
//   const [newComment, setNewComment] = useState("");
//   // const [likes, setLikes] = useState(post.likes);
//   const [isEditingPost, setIsEditingPost] = useState(false);
//   const [editedPostContent, setEditedPostContent] = useState(post.content);
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editedCommentContent, setEditedCommentContent] = useState("");

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (newComment.trim()) {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const response = await axios.post(
//           `https://mohamednowar.pythonanywhere.com/api/posts/${post.id}/comments/`,
//           { comment: newComment },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const comment = response.data;
//         setComments([comment, ...comments]);
//         setNewComment("");
//       } catch (error) {
//         console.error("Error adding comment:", error);
//       }
//     }
//   };

//   const handleEditPost = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.put(
//         `https://mohamednowar.pythonanywhere.com/api/posts/${post.id}/`,
//         { post_name: post.post_name, content: editedPostContent },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setIsEditingPost(false);
//       post.content = response.data.content;
//     } catch (error) {
//       console.error("Error editing post:", error);
//     }
//   };

//   const handleEditComment = async (commentId) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.put(
//         `https://mohamednowar.pythonanywhere.com/api/posts/${post.id}/comments/${commentId}/`,
//         { comment: editedCommentContent },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setComments(comments.map(comment => 
//         comment.id === commentId ? response.data : comment
//       ));
//       setEditingCommentId(null);
//       setEditedCommentContent("");
//     } catch (error) {
//       console.error("Error editing comment:", error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-md mt-10 mx-auto w-full md:w-[600px]">
//       <div className="flex items-center mb-4">
//         <img
//           src={post.user.image}
//           alt="Profile"
//           className="w-12 h-12 rounded-full object-cover mr-4"
//         />
//         <div>
//           <h3 className="font-semibold text-lg">{post.user.username}</h3>
//           <p className="text-sm text-gray-500">
//             {new Date(post.created_at).toLocaleString()}
//           </p>
//         </div>
//       </div>

//       {post.image && (
//         <div className="mb-4">
//           <img
//             src={post.image}
//             alt="Post"
//             className="w-full h-64 object-cover rounded-lg"
//           />
//         </div>
//       )}

//       <div className="relative">
//         {isEditingPost ? (
//           <div className="flex items-center">
//             <textarea
//               value={editedPostContent}
//               onChange={(e) => setEditedPostContent(e.target.value)}
//               className="w-full p-2 border rounded mb-2"
//             />
//             <div className="flex gap-2 ml-2">
//               <button onClick={handleEditPost} className="text-green-600 hover:text-green-700 transition-colors">
//                 <FaSave />
//               </button>
//               <button onClick={() => setIsEditingPost(false)} className="text-red-600 hover:text-red-700 transition-colors">
//                 <FaTimes />
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-800 mb-4 whitespace-pre-line break-words">
//             {post.content}
//             {post.hashtag && (
//               <span className="text-green-600 cursor-pointer"> {post.hashtag}</span>
//             )}
//           </p>
//         )}

//         {!isEditingPost && (
//           <button onClick={() => setIsEditingPost(true)} className="absolute top-0 right-0 text-blue-600 font-medium text-sm">
//             <FaEdit />
//           </button>
//         )}
//       </div>

//       <div className="flex items-center gap-2 mb-4">
//         <button
//           // onClick={() => setLikes(likes + 1)}
//           className="flex items-center gap-1 text-gray-600 hover:text-green-600"
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             {/* <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//             /> */}
//           </svg>
//           {/* {likes} */}
//         </button>
//       </div>

//       <div className="border-t pt-4">
//         <div className="max-h-[300px] overflow-y-auto mb-4">
//           {comments?.map((comment) => (
//             <div
//               key={comment.id}
//               className="flex items-start mb-3 last:mb-0 whitespace-pre-line break-words relative"
//             >
//               <img
//                 src={comment.user.image}
//                 alt="User"
//                 className="w-8 h-8 rounded-full object-cover mr-3"
//               />
//               <div className="flex-1">
//                 <p className="text-sm font-medium">{comment.user.username}</p>
//                 <p className="text-xs text-gray-500 mb-1">
//                   {new Date(comment.created_at).toLocaleString()}
//                 </p>
//                 {editingCommentId === comment.id ? (
//                   <div className="flex items-center">
//                     <textarea
//                       value={editedCommentContent}
//                       onChange={(e) => setEditedCommentContent(e.target.value)}
//                       className="w-full p-2 border rounded mb-2"
//                     />
//                     <div className="flex gap-2 ml-2">
//                       <button onClick={() => handleEditComment(comment.id)} className="text-green-600 hover:text-green-700 transition-colors">
//                         <FaSave />
//                       </button>
//                       <button onClick={() => setEditingCommentId(null)} className="text-red-600 hover:text-red-700 transition-colors">
//                         <FaTimes />
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-600 w-full">
//                     {comment.comment}
//                   </p>
//                 )}
//                 {editingCommentId !== comment.id && (
//                   <button onClick={() => {
//                     setEditingCommentId(comment.id);
//                     setEditedCommentContent(comment.comment);
//                   }} className="absolute top-0 right-0 text-blue-600 font-medium text-sm">
//                     <FaEdit />
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <form
//           onSubmit={handleCommentSubmit}
//           className="flex items-center gap-2 mt-4"
//         >
//           <img
//             src={post.user.image}
//             alt="Profile"
//             className="w-8 h-8 rounded-full object-cover"
//           />
//           <input
//             type="text"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add a comment..."
//             className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
//           />
//           <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors text-sm">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5 md:w-6 md:h-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Post;

///////////////////////////////////////////////////////FIRSSSSSST//////////////////////////////////////////////////////////////////////////////////////////////////////////////








/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { FaEdit, FaSave, FaTimes, FaTrash } from 'react-icons/fa';

const Post = ({ post, onDeletePost }) => {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  const currentUser = { ...userProfile, id: userProfile?.username };

  const [comments, setComments] = useState(
    post.comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  );
  const [newComment, setNewComment] = useState("");
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedPostContent, setEditedPostContent] = useState(post.content);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [activeCommentMenu, setActiveCommentMenu] = useState(null);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
          `https://mohamednowar.pythonanywhere.com/api/posts/${post.id}/comments/`,
          { comment: newComment },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const comment = response.data;
        setComments([comment, ...comments]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleEditPost = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `https://mohamednowar.pythonanywhere.com/api/posts/${post.id}/`,
        { post_name: post.post_name, content: editedPostContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsEditingPost(false);
      post.content = response.data.content;
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `https://mohamednowar.pythonanywhere.com/api/posts/${post.id}/comments/${commentId}/`,
        { comment: editedCommentContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setComments(comments.map(comment =>
        comment.id === commentId ? response.data : comment
      ));
      setEditingCommentId(null);
      setEditedCommentContent("");
      setActiveCommentMenu(null);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `https://mohamednowar.pythonanywhere.com/api/posts/${post.id}/comments/${commentId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setComments(comments.filter(comment => comment.id !== commentId));
      setActiveCommentMenu(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `https://mohamednowar.pythonanywhere.com/api/posts/${post.id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      onDeletePost(post.id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md mt-10 mx-auto w-full md:w-[600px] relative">
      {currentUser?.id === post.user.username && !isEditingPost && (
        <div className="absolute top-2 right-2 z-20">
          <button onClick={() => setShowPostMenu(!showPostMenu)} className="text-gray-600 text-xl">⋮</button>
          {showPostMenu && (
            <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg text-sm">
              <button onClick={() => { setIsEditingPost(true); setShowPostMenu(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-100">✏️ Edit</button>
              <button onClick={handleDeletePost} className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">🗑️ Delete</button>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center mb-4">
        <img
          src={post.user.image}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-semibold text-lg">{post.user.username}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        {isEditingPost ? (
          <div className="flex items-center">
            <textarea
              value={editedPostContent}
              onChange={(e) => setEditedPostContent(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex gap-2 ml-2">
              <button onClick={handleEditPost} className="text-green-600 hover:text-green-700 transition-colors">
                <FaSave />
              </button>
              <button onClick={() => setIsEditingPost(false)} className="text-red-600 hover:text-red-700 transition-colors">
                <FaTimes />
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-800 whitespace-pre-line break-words">
              {post.content}
              {post.hashtag && (
                <span className="text-green-600 cursor-pointer"> {post.hashtag}</span>
              )}
            </p>
            {post.image && (
              <div className="mt-4">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </>
        )}
      </div>

      <div className="border-t pt-4">
        <div className="max-h-[300px] overflow-y-auto mb-4">
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start mb-3 last:mb-0 relative"
            >
              <img
                src={comment.user.image}
                alt="User"
                className="w-8 h-8 rounded-full object-cover mr-3"
              />
              <div className="flex-1 bg-gray-50 p-3 rounded-lg relative max-w-full break-words">
                <p className="text-sm font-medium">{comment.user.username}</p>
                <p className="text-xs text-gray-500 mb-1">
                  {new Date(comment.created_at).toLocaleString()}
                </p>

                {editingCommentId === comment.id ? (
                  <div className="flex items-center">
                    <textarea
                      value={editedCommentContent}
                      onChange={(e) => setEditedCommentContent(e.target.value)}
                      className="w-full p-2 border rounded mb-2 resize-none"
                    />
                    <div className="flex gap-2 ml-2">
                      <button onClick={() => handleEditComment(comment.id)} className="text-green-600 hover:text-green-700 transition-colors">
                        <FaSave />
                      </button>
                      <button onClick={() => setEditingCommentId(null)} className="text-red-600 hover:text-red-700 transition-colors">
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 w-full break-words whitespace-pre-wrap overflow-wrap break-word break-all">
                    {comment.comment}
                  </div>
                )}

                {currentUser?.id === comment.user.username && editingCommentId !== comment.id && (
                  <div className="absolute top-2 right-2 text-right z-20">
                    <button onClick={() => setActiveCommentMenu(activeCommentMenu === comment.id ? null : comment.id)} className="text-gray-600 text-xl">⋮</button>
                    {activeCommentMenu === comment.id && (
                      <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg text-sm">
                        <button onClick={() => { setEditingCommentId(comment.id); setEditedCommentContent(comment.comment); setActiveCommentMenu(null); }} className="w-full px-4 py-2 text-left hover:bg-gray-100">✏️ Edit</button>
                        <button onClick={() => handleDeleteComment(comment.id)} className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">🗑️ Delete</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 mt-4">
          <img
            src={post.user.image}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;







