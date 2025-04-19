// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import Post from "./post/post";
// import { userContext } from "../../Context/User.context";

// export default function ContainerPost({ newPost }) {
//   const token = localStorage.getItem("accessToken");
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function getPosts() {
//       try {
//         const res = await axios.get(
//           "https://mohamednowar.pythonanywhere.com/api/posts/",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setPosts(res.data);
//         setLoading(false);
//       } catch (e) {
//         console.log(e);
//         setLoading(false);
//       }
//     }
//     getPosts();
//   }, [token]);

//   useEffect(() => {
//     if (newPost) {
//       setPosts((prevPosts) => [newPost, ...prevPosts]);
//     }
//   }, [newPost]);

//   return (
//     <section className="container mx-auto flex flex-col items-center gap-8">
//       {loading ? (
//         <div className="loader">Loading...</div>
//       ) : (
//         posts
//           .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//           .map((post) => <Post key={post.id} post={post} />)
//       )}
//     </section>
//   );
// }


//////////////////////////////////////////////FIRSSST////////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Post from "./post/post";
import { userContext } from "../../Context/User.context";

export default function ContainerPost({ newPost }) {
  const token = localStorage.getItem("accessToken");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await axios.get(
          "https://mohamednowar.pythonanywhere.com/api/posts/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPosts(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    getPosts();
  }, [token]);

  useEffect(() => {
    if (newPost) {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [newPost]);


  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <section className="container mx-auto flex flex-col items-center gap-8">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        posts
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((post) => (
            <Post key={post.id} post={post} onDeletePost={handleDeletePost} />
          ))
      )}
    </section>
  );
}












