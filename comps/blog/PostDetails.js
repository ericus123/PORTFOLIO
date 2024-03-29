import Image from "next/image";
import Prism from "prismjs";
import { useEffect } from "react";
import { Col, Media, Row } from "react-bootstrap";
import Moment from "react-moment";
import readingTime from "reading-time";
import unknown_avatar from "../../public/images/avatar.png";
import AdBanner from "../ads";
import AuthorCard from "../author/AuthorCard";
import { SupportBlog } from "../buymecoffee";
import Comments from "./comments/Comments";
import styles from "./index.module.scss";
import { BigLike } from "./Likes/likes";
import { PostShares } from "./shares/Shares";
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
                    <Moment format="DD MMM YYYY" date={post?.createdAt} />
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
            <br />
            <AuthorCard
              image={post.author.avatar || unknown_avatar}
              bio={post.author.bio}
              last_name={post?.author?.lastName}
              first_name={post?.author?.firstName}
            />{" "}
            <br />
            <SupportBlog />
            <BigLike id={id} />
            <br />
            <br />
            <AdBanner
              data-ad-slot="7105763628"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            <br />
            <Comments comment={post.comments} id={id} post={post} />
          </Media.Body>
        </Media>
      </>
    )
  );
};

export default PostsDetails;
