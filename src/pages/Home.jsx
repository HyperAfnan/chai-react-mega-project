import { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index.js";
import service from "../appwrite/config.js";

const Home = () => {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    service
      .getPosts()
      .then((posts) => (posts ? setPosts(posts.documents) : []))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  if (post.length === 0) {
    return (
      <div className="py-8">
        <Container>
          <h1 className="text-2xl font-bold mb-4">No posts available</h1>
          <p>Please check back later.</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 w-full ">
      <Container>
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {post.map((item) => (
            <PostCard key={item.$id} post={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
