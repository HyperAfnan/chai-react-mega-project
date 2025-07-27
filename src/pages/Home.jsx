import { useEffect } from "react";
import { Container, PostCard } from "../components/index.js";
import service from "../appwrite/config.js";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../store/postSlice.js";

const Home = () => {
   const dispatch = useDispatch();
   const posts = useSelector((state) => state.post.posts);
   useEffect(() => {
      if (posts.length === 0) {
         service
            .getPosts()
            .then((response) => (response ? dispatch(createPost(response.documents)) : []))
            .catch((error) => console.error("Error fetching posts:", error));
      }
   }, [dispatch, posts]);

   return posts.length === 0 ? (
      <div className="py-8">
         <Container>
            <h1 className="text-2xl font-bold mb-4">No posts available</h1>
            <p>Please check back later.</p>
         </Container>
      </div>
   ) : (
      <div className="py-8 w-full ">
         <Container>
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {posts?.map((item) => (
                  <PostCard
                     key={item.$id}
                     title={item.title}
                     $id={item.$id}
                     featuredImage={item.featuredImage}
                  />
               ))}
            </div>
         </Container>
      </div>
   );
};

export default Home;
