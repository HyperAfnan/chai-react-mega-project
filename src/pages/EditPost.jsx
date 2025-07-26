import { Container, PostForm } from "../components/index.js";
import service from "../appwrite/config.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}
