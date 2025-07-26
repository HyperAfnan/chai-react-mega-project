import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config.js";
import PostCard from "../components/PostCard.jsx";
import { Container } from "../components/index.js";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => setPosts(posts));
  }, []);

  return posts.length === 0 ? (
    <div className="container mx-auto px-4 py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div key={post.$id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <div className="py-8">
      <Container>
        <h1 className="text-2xl font-bold mb-4">No posts available</h1>
        <p>Create one post</p>
      </Container>
    </div>
  );
};

export default AllPosts;
