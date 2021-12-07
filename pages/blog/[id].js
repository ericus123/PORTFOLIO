import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Comments from "../../comps/comments/Comments";
import { BigLike } from "../../comps/Likes/likes";
import { Media, Row, Col, Alert } from "react-bootstrap";
import readingTime from "reading-time";
import http from "../../utils/axios/axios";
import unknown_avatar from "../../public/images/avatar.png";
import SideBar from "../../comps/sidebar/sideBar";
import ScrolButton from "../../reusables/ScrollUp";
import { PostShares } from "../../comps/shares/Shares";
import Image from "next/image";
import Head from "next/head";

export const getStaticPaths = async () => {
  const res = await http.get("/api/posts");
  const data = await res.data?.posts;
  const paths = data?.map((post) => {
    return {
      params: { id: post._id },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const res = await http.get(`/api/posts/${id}`);
  const post = await res.data.post;

  return {
    props: { post: post, id: id },
  };
};
const SinglePost = ({ post, id }) => {
  const frontendURL = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const message = useSelector((state) => state.post.message);
  const error = useSelector((state) => state.post.error);
  const user = useSelector((state) => state.checkAuth.user);

  const CommentReply = useSelector((state) => state.postCommentReply.reply);
  const CommentReplyError = useSelector(
    (state) => state.postCommentReply.error
  );
  const CommentReplyMessage = useSelector(
    (state) => state.postCommentReply.msg
  );
  const CommentReplyisLoading = useSelector(
    (state) => state.postCommentReply.isLoading
  );
  const reactionUser = useSelector((state) => state.postReaction.reactionUser);
  const reactionMsg = useSelector((state) => state.postReaction.reactionMsg);
  const reactionError = useSelector(
    (state) => state.postReaction.reactionError
  );
  const reactionisLoading = useSelector(
    (state) => state.postReaction.reactionisLoading
  );

  const singlePost = post ? (
    <>
      <Media as="li" className="single" style={{ listStyle: "none" }}>
        <Media.Body className="body">
          <h3
            className="title"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            {post.title}
          </h3>
          <Row className="mb-2">
            <Col xs="1" sm="1" className="mb-1 mr-1 ">
              <div className="profile-picture-sm">
                <Image
                  src={post.author ? post.author.avatar : unknown_avatar}
                  width="60"
                  height="60"
                />
              </div>
            </Col>
            <Col sm="5" md="5" className="mt-2">
              {" "}
              <p className="more_details">
                {post.user ? (
                  <span classname="authors_name">
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
                  Created at {new Date(post.createdAt).toLocaleString()}
                  {post.updatedAt ? post.updatedAt : null} |&nbsp;
                  {readingTime(post.description).text}
                </span>
              </p>
            </Col>
            <Col className="mt-1">
              <PostShares id={id} />
            </Col>
          </Row>
          <img className="mr-3" src={post.imageUrl} alt={post.title} />
          <br />
          <br />
          <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
          <br />
          <BigLike id={id} />
          <br />
          <br />
          <br />
          <br />
          <Comments comment={post.comments} id={id} />
        </Media.Body>
      </Media>
    </>
  ) : null;

  const err = error ? <Alert variant="danger">{error}</Alert> : null;
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>AMANI Eric | Blog</title>
        <meta name="title" content={post.title} />
        <meta
          name="description"
          content={
            post.description.replace(/(<([^>]+)>)/gi, "").substr(0, 250) + "..."
          }
        />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${frontendURL}/blog/${post._id}`} />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={
            post.description.replace(/(<([^>]+)>)/gi, "").substr(0, 250) + "..."
          }
        />
        <meta property="og:image" content={post.imageUrl} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`${frontendURL}/blog/${post._id}`}
        />
        <meta property="twitter:title" content={post.title} />
        <meta
          property="twitter:description"
          content={
            post.description.replace(/(<([^>]+)>)/gi, "").substr(0, 250) + "..."
          }
        />
        <meta property="twitter:image" content={`${post.imageUrl}`} />
      </Head>
      <div className="single-post">
        <>
          <ScrolButton />
          {singlePost}
        </>
        <div style={{ marginTop: "1rem" }}>
          <SideBar id={id} />
        </div>
      </div>
    </>
  );
};

export default SinglePost;
