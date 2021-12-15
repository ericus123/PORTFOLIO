import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import unknown_avatar from "../../../public/images/avatar.png";
import { useRouter } from "next/router";
import { simpleAlert } from "../../Alerts";
import { Spinner, Form, Button, Modal, Col } from "react-bootstrap";
import styles from "./index.module.scss";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  GetComments,
  PostComment,
  EditPostComment,
  DeletePostComment,
  PostCommentReply,
  EditCommentReply,
  DeleteCommentReply,
  ReactOnPostComment,
  ReactOnCommentReply,
} from "../../../redux/actions/blog/posts";
import TimeAgo from "react-timeago";
import { authRequest } from "../../../redux/actions/auth/checkAuth";
import Image from "next/image";
import PopConfirm from "../../popups/popComfirm";
import HighLightAuthor from "./HighlightAuthor";
import CommentReactions from "./CommentReactions";
import CommentsBlocked from "./CommentsBlocked";
import CommentBox from "./CommentBox";

const Comments = ({ id, post }) => {
  const [reply, setReply] = useState(null);
  const [edComShow, setEdComShow] = useState(false);
  const [edRepShow, setEdRepShow] = useState(false);
  const [comId, setComId] = useState(null);
  const [repId, setRepId] = useState(null);
  const [com, setCom] = useState("");
  const [rep, setRep] = useState("");
  const postCommentError = useSelector((state) => state.postComment.error);
  const postCommentMessage = useSelector((state) => state.postComment.message);
  const postCommentIsLoading = useSelector(
    (state) => state.postComment.isLoading
  );
  const editCommentError = useSelector((state) => state.editComment.error);
  const editCommentMessage = useSelector((state) => state.editComment.message);
  const editCommentIsLoading = useSelector(
    (state) => state.editComment.isLoading
  );

  const comments = useSelector((state) => state.getComments.comments);

  const editReplyError = useSelector((state) => state.editCommentReply.error);
  const editReplyMessage = useSelector(
    (state) => state.editCommentReply.message
  );
  const editReplyIsLoading = useSelector(
    (state) => state.editCommentReply.isLoading
  );

  const deleteReplyError = useSelector(
    (state) => state.deleteCommentReply.error
  );
  const deleteReplyMessage = useSelector(
    (state) => state.deleteCommentReply.message
  );
  const deleteReplyIsLoading = useSelector(
    (state) => state.deleteCommentReply.isLoading
  );

  const deleteCommentError = useSelector((state) => state.deleteComment.error);
  const deleteCommentMessage = useSelector(
    (state) => state.deleteComment.message
  );
  const deleteCommentIsLoading = useSelector(
    (state) => state.deleteComment.isLoading
  );

  const postCommentReplyError = useSelector(
    (state) => state.postCommentReply.error
  );

  const postCommentReply = useSelector((state) => state.postCommentReply.reply);
  const postCommentReplyIsLoading = useSelector(
    (state) => state.postCommentReply.isLoading
  );

  const commentReactionError = useSelector(
    (state) => state.commentReaction.error
  );

  const commentReactionMessage = useSelector(
    (state) => state.commentReaction.message
  );

  const replyReactionError = useSelector((state) => state.replyReaction.error);
  const replyReactionIsLoading = useSelector(
    (state) => state.replyReaction.isLoading
  );
  const replyReactionMessage = useSelector(
    (state) => state.replyReaction.message
  );
  const user = useSelector((state) => state.checkAuth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetComments(id));
  }, [
    post,
    editCommentMessage,
    deleteCommentMessage,
    deleteCommentError,
    postCommentReply,
    deleteCommentIsLoading,
    editCommentMessage,
    deleteReplyMessage,
    deleteReplyIsLoading,
    commentReactionMessage,
    replyReactionMessage,
    postCommentMessage,
  ]);

  useEffect(() => {
    setEdComShow(false);
  }, [editCommentMessage]);

  useEffect(() => {
    setTimeout(() => {
      setEdRepShow(false);
    }, 1000);
  }, [editReplyMessage]);

  let errors_arr = [
    editCommentError,
    postCommentError,
    postCommentReplyError,
    deleteCommentError,
    deleteReplyError,
    editReplyError,
    commentReactionError,
    replyReactionError,
  ];

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    dispatch(authRequest(token));
    errors_arr.map((error) => {
      if (error === "Invalid Token") {
        localStorage.clear();
        router.push("/login");
      }
    });
  }, errors_arr);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(PostComment(id, e.target.desc.value));
    e.target.reset();
  };

  const EditReplyModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(EditCommentReply(repId, e.target.desc.value));
          }}
        >
          <Modal.Body style={{ marginBottom: "-1%" }}>
            <h4>Edit reply</h4>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  controlId="exampleForm.ControlTextarea1"
                  name="desc"
                  disabled={editReplyIsLoading}
                  defaultValue={rep}
                />
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <div className="mod-footer">
            {editReplyError ? simpleAlert("danger", editReplyError) : null}
          </div>

          {!editReplyError ? (
            <div className="mod-footer">
              <Button
                disabled={editReplyIsLoading}
                style={{ margin: "1% 1% 1% 0%" }}
                type="submit"
              >
                {editReplyIsLoading ? (
                  <Spinner animation="border" size="sm" role="status" />
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                style={{ margin: "1% 1% 1% 0%" }}
                onClick={props.onHide}
                variant="danger"
                disabled={editReplyIsLoading}
              >
                Cancel
              </Button>{" "}
            </div>
          ) : null}
        </Form>
      </Modal>
    );
  };
  const EditCommentModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(EditPostComment(comId, e.target.desc.value));
          }}
        >
          <Modal.Body style={{ marginBottom: "-1%" }}>
            <h4>Edit comment</h4>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  controlId="exampleForm.ControlTextarea1"
                  name="desc"
                  disabled={editCommentIsLoading}
                  defaultValue={com}
                />
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <div className="mod-footer">
            {editCommentError ? simpleAlert("danger", editCommentError) : null}
          </div>

          {!editCommentError ? (
            <div className="mod-footer">
              <Button
                disabled={editCommentIsLoading}
                style={{ margin: "1% 1% 1% 0%" }}
                type="submit"
              >
                {editCommentIsLoading ? (
                  <Spinner animation="border" size="sm" role="status" />
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                disabled={editCommentIsLoading}
                style={{ margin: "1% 1% 1% 0%" }}
                onClick={props.onHide}
                variant="danger"
              >
                Cancel
              </Button>{" "}
            </div>
          ) : null}
        </Form>
      </Modal>
    );
  };
  const all_comments = comments?.map((comment) => {
    return (
      <div className="comment" key={comment._id}>
        <div className="profile-picture-sm">
          <Image
            width="40px"
            height="40px"
            src={comment.user ? comment.user.avatar : unknown_avatar}
            priority
            quality={25}
            className={styles.user_img}
          />
        </div>
        <div className="desc">
          <p style={{ marginBottom: "0px" }}>
            <span style={{ fontWeight: "BOLD" }}>
              {comment.user
                ? `${comment.user.firstName} ${comment.user.lastName}`
                : "ANONYMOUS"}{" "}
            </span>
            &nbsp;
            <span style={{ fontWeight: ".5em", fontSize: "small" }}>
              <TimeAgo date={comment.createdAt} />
            </span>
            &nbsp;
            {comment.updatedAt ? (
              <span style={{ color: "gray" }}>
                <i style={{ fontSize: "smaller" }}>updated</i>
              </span>
            ) : null}
          </p>

          <HighLightAuthor
            postAuthor={post?.author._id}
            dataAuthor={comment?.user?._id}
          />

          <p className="text">{comment.description}</p>

          <p>
            <CommentReactions
              data={comment}
              onClick={() => {
                dispatch(ReactOnPostComment(comment._id));
              }}
              user={user}
            />
            <span
              className="com-reply"
              onClick={() => {
                if (reply == comment._id) {
                  setReply(null);
                } else {
                  setReply(comment._id);
                }
              }}
            >
              Reply
            </span>
            &nbsp;&nbsp;&nbsp;
            {user && user.id == comment.user?._id ? (
              <>
                {" "}
                <span
                  style={{ color: "#17a2b8", cursor: "pointer" }}
                  onClick={() => {
                    setCom(comment.description);
                    setEdComShow(true);
                    setComId(comment._id);
                  }}
                >
                  Edit
                </span>
                &nbsp;
                <PopConfirm
                  title="Are You Sure?"
                  text="Delete"
                  style={{ color: "#dc3545" }}
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  action={() => dispatch(DeletePostComment(comment._id))}
                />
              </>
            ) : null}
          </p>
          <div className="replies">
            {comment.replies
              ? comment.replies.map((reply) => {
                  return (
                    <div className="reply" key={reply._id}>
                      <div className={`profile-p-sm ${styles.user_img}`}>
                        <Image
                          className={`${styles.user_img} b-border`}
                          src={reply.user ? reply.user.avatar : unknown_avatar}
                          width="35px"
                          height="35px"
                          priority
                          quality={25}
                        />
                      </div>
                      <div className="desc">
                        <p style={{ marginBottom: "0px" }}>
                          <span style={{ fontWeight: "BOLD" }}>
                            {reply.user
                              ? `${reply.user.firstName} ${reply.user.lastName}`
                              : "ANONYMOUS"}
                          </span>
                          &nbsp;
                          <span
                            style={{
                              fontWeight: ".5em",
                              fontSize: "small",
                            }}
                          >
                            <TimeAgo date={reply.createdAt} />
                          </span>
                          &nbsp;
                          {reply.updatedAt ? (
                            <span style={{ color: "gray" }}>
                              <i style={{ fontSize: "smaller" }}>updated</i>
                            </span>
                          ) : null}
                        </p>

                        <HighLightAuthor
                          postAuthor={post?.author._id}
                          dataAuthor={reply?.user?._id}
                        />
                        <p className="text">{reply.description}</p>
                        <p>
                          <CommentReactions
                            data={reply}
                            onClick={() => {
                              dispatch(ReactOnCommentReply(reply._id));
                            }}
                            user={user}
                            isLoading={replyReactionIsLoading}
                          />
                          {user && user.id == reply.user._id ? (
                            <>
                              {" "}
                              <span
                                style={{
                                  color: "#17a2b8",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setRep(reply.description);
                                  setEdRepShow(true);
                                  setRepId(reply._id);
                                }}
                              >
                                Edit
                              </span>
                              &nbsp;
                              <PopConfirm
                                title="Are You Sure?"
                                text="Delete"
                                style={{ color: "#dc3545" }}
                                icon={
                                  <QuestionCircleOutlined
                                    style={{ color: "red" }}
                                  />
                                }
                                action={() =>
                                  dispatch(DeleteCommentReply(reply._id))
                                }
                              />
                            </>
                          ) : null}
                        </p>
                      </div>
                    </div>
                  );
                })
              : null}
            <form
              className={reply == comment._id ? "form-on" : "form-off"}
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(PostCommentReply(comment._id, e.target.desc.value));
                e.target.reset();
              }}
            >
              <textarea name="desc" placeholder="Reply here..." />

              {postCommentReplyError
                ? simpleAlert("danger", postCommentReplyError)
                : null}
              {!postCommentReplyError ? (
                <button type="submit" className="px-2">
                  {" "}
                  {postCommentReplyIsLoading ? (
                    <Spinner animation="border" size="sm" role="status" />
                  ) : (
                    "Reply"
                  )}
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="comments">
      <p className="com_title">
        Comments&nbsp;
        <span className="comments-nbr">
          {comments?.length ? comments?.length : null}
        </span>
      </p>
      <hr style={{ fontWeight: "bold", fontSize: "10px" }} />
      {!comments?.length && user && (
        <p style={{ fontSize: ".8em", textAlign: "center" }}>
          Be the first to comment
        </p>
      )}
      <div className="comment-wrapper">
        {all_comments}
        <EditCommentModal show={edComShow} onHide={() => setEdComShow(false)} />
        <EditReplyModal show={edRepShow} onHide={() => setEdRepShow(false)} />
      </div>
      {/* <CommentsSort comments={comments} /> */}

      {(user && (
        <CommentBox
          onSubmit={handleSubmit}
          postCommentError={postCommentError}
          postCommentIsLoading={postCommentIsLoading}
        />
      )) || <CommentsBlocked />}
    </div>
  );
};

export default Comments;
