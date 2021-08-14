import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Comments from "../../comps/comments/Comments";
import { BigLike } from "../../comps/Likes/likes";
import { Media, Row, Alert } from "react-bootstrap";
import readingTime from "reading-time";
import http from "../../utils/axios/axios";
import unknown_avatar from "../../assets/images/avatar.png";
import SideBar from "../../comps/sidebar/sideBar";
import ScrolButton from "../../reusables/ScrollUp";
import { PostShares } from "../../comps/shares/Shares";

export const getStaticPaths = async () => {
  const res = await http.get("/api/posts/all");
  const data = await res.data.posts;
  const paths = data.map((post) => {
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
  const dispatch = useDispatch();
  // const { id, slug } = useParams();
  // useEffect(() => {
  //   dispatch(getPostReactions(id));
  // }, [id]);

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
      <Media as="li" className="single">
        <Media.Body className="body">
          <h3
            className="title"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            {post.title}
          </h3>
          <div className="author">
            <img
              className="author_image"
              src={post.author ? post.author.avatar : unknown_avatar}
            />
            <p className="more_details">
              {post.user ? (
                <span classname="authors_name">
                  {" "}
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
          </div>
          <img className="mr-3" src={post.imageUrl} alt={post.title} />
          <br />
          <Row className="post-contribution">
            <PostShares id={id} />
          </Row>
          <br />
          <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
          <br />
          <BigLike />
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
    <div className="single-post">
      <>
        <ScrolButton />
        {singlePost}
      </>
      <>
        <SideBar id={id} />
      </>
    </div>
  );
};

export default SinglePost;
