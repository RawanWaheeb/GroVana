import { useState } from "react";
import UploadPost from "./uploadPost/UploadPost";
import ContainerPost from "./ContainerPost";

export default function Community() {
  const [newPost, setNewPost] = useState(null);

  const handleNewPost = (post) => {
    setNewPost(post);
  };

  return (
    <div className="py-20 h-auto mt-24">
      <section className="container mx-auto flex justify-center">
        <UploadPost onCreatePost={handleNewPost} />
      </section>

      <ContainerPost newPost={newPost} />
    </div>
  );
}
