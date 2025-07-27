import PostCard from "../components/PostCard.jsx";
import { Container } from "../components/index.js";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../store/postSlice.js";
import { useEffect } from "react";
import service from "../appwrite/config.js";

const AllPosts = () => {
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (posts.length === 0) {
      service
        .getPosts()
        .then((response) =>
          response ? dispatch(createPost(response.documents)) : [],
        )
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [dispatch, posts]);

  return posts.length !== 0 ? (
    <div className="container mx-auto px-4 py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div key={post.$id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <PostCard
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
              />
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
