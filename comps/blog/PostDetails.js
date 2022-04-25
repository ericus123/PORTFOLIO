import styles from "./index.module.scss";
import { Media, Row, Col } from "react-bootstrap";
import Image from "next/image";
import readingTime from "reading-time";
import { PostShares } from "./shares/Shares";
import { BigLike } from "./Likes/likes";
import Comments from "./comments/Comments";
import unknown_avatar from "../../public/images/avatar.png";
import Prism from "prismjs";
import { useEffect } from "react";
// import AuthorCard from "../author/AuthorCard";

const PostsDetails = ({ post }) => {
  const id = post._id;
  useEffect(() => {
    Prism.highlightAll();
  }, [post.description]);

  return (
    post && (
      <>
        <Media as="li" className="single" style={{ listStyle: "none" }}>
          <Media.Body className="body">
            <h3
              className={`title ${styles.post_title}`}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              {post.title}
            </h3>
            <Row className="mb-2">
              <Col xs="1" sm="1" className="mb-1 mr-1 ">
                <div className="author-img-container">
                  <Image
                    src={post.author.avatar || unknown_avatar}
                    width={60}
                    height={60}
                    layout="responsive"
                    className="author-img"
                    quality={25}
                    priority
                  />
                </div>
              </Col>
              <Col sm="5" md="5" className="mt-2">
                {" "}
                <p className="more_details">
                  {post.user ? (
                    <span className="authors_name">
                      {post.author ? (
                        <b>{`${post.author.firstName} ${post.author.lastName}`}</b>
                      ) : (
                        "AMANI Eric"
                      )}
                    </span>
                  ) : (
                    <span className="authors_name">AMANI Eric</span>
                  )}

                  <span className="post_det">
                    On {new Date(post.createdAt).toLocaleString()}
                    {post.updatedAt ? post.updatedAt : null} |&nbsp;
                    {readingTime(post.description).text}
                  </span>
                </p>
              </Col>
              <Col className="mt-1">
                <PostShares slug={post.slug} />
              </Col>
            </Row>
            <div className={styles.article_img}>
              <Image
                src={post.imageUrl}
                alt={post.title}
                height={200}
                width={200}
                layout="responsive"
                quality={25}
                priority
              />
            </div>
            <br />
            <br />
            <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
            {/* <br /> */}
            {/* <AuthorCard image={post.author.avatar || unknown_avatar} bio={post.author.bio} last_name={post?.author?.lastName} first_name={post?.author?.last_name}/> */}
            {/* <br /> */}
            <BigLike id={id} />
            <br />
            <br />
            <br />
            <br />
            <Comments comment={post.comments} id={id} post={post} />
          </Media.Body>
        </Media>
      </>
    )
  );
};

export default PostsDetails;
