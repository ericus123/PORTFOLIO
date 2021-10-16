import React from "react";
import { Alert, Carousel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

const PostsSlider = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const error = useSelector((state) => state.posts.error);

  const postsSlider = posts.length
    ? posts.slice(0, 5).map((post) => {
        return (
          <Carousel.Item className="slider" interval={10000}>
            <img
              className="slider_image"
              className="d-block w-100"
              src={post.imageUrl}
            />
            <Carousel.Caption>
              <Link href={`/blog/${post._id}`}>
                <a
                  style={{
                    color: "rgb(0, 123, 255)",
                    background: "white",
                    textDecoration: "none",
                    paddingLeft: "2px",
                    marginRight: "2px",
                  }}
                >
                  {post.title}
                </a>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })
    : null;

  const err = error ? (
    <Alert variant="danger" style={{ textAlign: "center" }}>
      {error}
    </Alert>
  ) : null;

  return (
    <span>
      {err}
      <Carousel prevLabel={null} nextLabel={null} fade time>
        {postsSlider}
      </Carousel>
      <br />
    </span>
  );
};
export default PostsSlider;
