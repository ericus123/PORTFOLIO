import React from "react";
import { Alert, Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.scss";

const PostsSlider = () => {
  const posts = useSelector((state) => state.posts.posts);
  const error = useSelector((state) => state.posts.error);

  const postsSlider = posts.length
    ? posts.slice(0, 5).map((post) => {
        return (
          <Carousel.Item
            className="slider"
            interval={10000}
            key={Math.random()}
          >
            <div className={styles.image_slider_item}>
              <Image
                className="slider_image d-block w-100 img-border-radius"
                src={post.imageUrl}
                width={400}
                height={300}
                layout="responsive"
                priority
                quality={25}
              />
            </div>
            <Carousel.Caption>
              <Link href={`/blog/${post.slug}`}>
                <span className={styles.slider_caption}>{post.title}</span>
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
