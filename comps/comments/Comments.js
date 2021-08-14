import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import unknown_avatar from "../../assets/images/avatar.png";
import { faHeart, faCrown } from "@fortawesome/fontawesome-free-solid";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { simpleAlert } from "../Alerts";
import { Spinner, Form, Button, Modal, Col } from "react-bootstrap";
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
} from "../../redux/actions/blog/posts";
import TimeAgo from "react-timeago";
import { authRequest } from "../../redux/actions/auth/checkAuth";

const Comments = ({ id }) => {
  const [sort, setSort] = useState("new");
  const [reply, setReply] = useState(null);
  const [delComShow, setDelComShow] = useState(false);
  const [edComShow, setEdComShow] = useState(false);
  const [edRepShow, setEdRepShow] = useState(false);
  const [delRepShow, setDelRepShow] = useState(false);
  const [comId, setComId] = useState(null);
  const [repId, setRepId] = useState(null);
  const [com, setCom] = useState("");
  const [rep, setRep] = useState("");
  const postCommentError = useSelector((state) => state.postComment.error);
  const postCommentMessage = useSelector((state) => state.postComment.message);
  const postCommentIsLoading = useSelector(
    (state) => state.postComment.isLoading
  );
  const post = useSelector((state) => state.post.post);
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
  const postCommentReplyMessage = useSelector(
    (state) => state.postCommentReply.message
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
  const replyReactionMessage = useSelector(
    (state) => state.replyReaction.message
  );
  const replyReactionIsLoading = useSelector(
    (state) => state.replyReaction.isLoading
  );

  const user = useSelector((state) => state.checkAuth.user);
  const auth_error = useSelector((state) => state.checkAuth.error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetComments(id));
  }, [
    post,
    postCommentMessage,
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
  }, [
    editCommentError,
    postCommentError,
    postCommentReplyError,
    deleteCommentError,
    deleteReplyError,
    editReplyError,
    commentReactionError,
    replyReactionError,
  ]);

  const DeleteCommentModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Delete comment</h4>
          <p>
            Are you sure you want to delete this comment?
            <br />
            This action can't be undone{" "}
          </p>
        </Modal.Body>
        <div className="mod-footer">
          <Button onClick={props.onHide}>No</Button>
          <Button
            variant="danger"
            onClick={() => {
              props.onHide();
              dispatch(DeletePostComment(comId));
            }}
          >
            Yes
          </Button>
        </div>
      </Modal>
    );
  };

  const DeleteReplyModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Delete reply</h4>
          <p>
            Are you sure you want to delete this reply?
            <br />
            This action can't be undone{" "}
          </p>
        </Modal.Body>
        <div className="mod-footer">
          <Button onClick={props.onHide}>No</Button>
          <Button
            variant="danger"
            onClick={() => {
              props.onHide();
              dispatch(DeleteCommentReply(repId));
            }}
          >
            Yes
          </Button>
        </div>
      </Modal>
    );
  };

  const EditReplyModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
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
                  defaultValue={rep}
                />
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <div className="mod-footer">
            {editReplyError ? simpleAlert("danger", editReplyError) : null}
          </div>
          <div className="mod-footer">
            {editReplyMessage ? simpleAlert("success", editReplyMessage) : null}
          </div>
          <div className="mod-footer">
            {editReplyIsLoading ? (
              <div style={{ textAlign: "center" }}>
                <Spinner animation="border" size="lg" role="status" />
              </div>
            ) : null}
          </div>

          {!editReplyError && !editReplyMessage && !editReplyIsLoading ? (
            <div className="mod-footer">
              <Button
                style={{ margin: "1% 1% 1% 0%" }}
                onClick={props.onHide}
                variant="danger"
              >
                Cancel
              </Button>{" "}
              <Button style={{ margin: "1% 1% 1% 0%" }} type="submit">
                Save changes
              </Button>
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
        centered
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
                  defaultValue={com}
                />
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <div className="mod-footer">
            {editCommentError ? simpleAlert("danger", editCommentError) : null}
          </div>
          <div className="mod-footer">
            {editCommentMessage
              ? simpleAlert("success", editCommentMessage)
              : null}
          </div>
          <div className="mod-footer">
            {editCommentIsLoading ? (
              <div style={{ textAlign: "center" }}>
                <Spinner animation="border" size="lg" role="status" />
              </div>
            ) : null}
          </div>

          {!editCommentError && !editCommentMessage && !editCommentIsLoading ? (
            <div className="mod-footer">
              <Button
                style={{ margin: "1% 1% 1% 0%" }}
                onClick={props.onHide}
                variant="danger"
              >
                Cancel
              </Button>{" "}
              <Button style={{ margin: "1% 1% 1% 0%" }} type="submit">
                Save changes
              </Button>
            </div>
          ) : null}
        </Form>
      </Modal>
    );
  };
  const all_comments = comments?.map((comment) => {
    return (
      <div className="comment" key={comment._id}>
        <div className="avatar">
          <img src={comment.user ? comment.user.avatar : unknown_avatar} />
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
          {post?.user && post?.user._id == comment?.user._id ? (
            <p className="author-badge">
              <FontAwesomeIcon icon={faCrown} />
              &nbsp;Author
            </p>
          ) : null}

          <p className="text">{comment.description}</p>

          <p>
            <span className="com-like">
              {user &&
              comment.likes.some(
                (like) => like.user && like.user._id == user._id
              ) ? (
                <span className="likes">
                  <FontAwesomeIcon
                    className="com-icon com-liked"
                    icon={faHeart}
                    onClick={() => {
                      dispatch(ReactOnPostComment(comment._id));
                    }}
                  />{" "}
                  {comment.likes.length ? (
                    <span class="n">{comment.likes.length}</span>
                  ) : null}
                </span>
              ) : (
                <span className="likes">
                  <FontAwesomeIcon
                    onClick={() => {
                      dispatch(ReactOnPostComment(comment._id));
                    }}
                    className="com-unliked"
                    icon={faHeart}
                  />
                  &nbsp;
                  {comment.likes.length ? (
                    <span class="n">{comment.likes.length}</span>
                  ) : null}
                </span>
              )}
            </span>
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
            {user && user.id == comment.user._id ? (
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
                <span
                  style={{ color: "#dc3545", cursor: "pointer" }}
                  onClick={() => {
                    setComId(comment._id);
                    setDelComShow(true);
                  }}
                >
                  Delete
                </span>
              </>
            ) : null}
          </p>
          <div className="replies">
            {comment.replies
              ? comment.replies.map((reply) => {
                  return (
                    <div className="reply" key={reply._id}>
                      <div className="reply_avatar">
                        <img
                          src={reply.user ? reply.user.avatar : unknown_avatar}
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
                        <p className="text">{reply.description}</p>
                        <p>
                          <span className="com-like">
                            {user &&
                            reply.likes.some(
                              (like) => like.user && like.user._id == user._id
                            ) ? (
                              <span className="likes">
                                <FontAwesomeIcon
                                  className="com-icon com-liked"
                                  icon={faHeart}
                                  onClick={() => {
                                    dispatch(ReactOnCommentReply(reply._id));
                                  }}
                                />{" "}
                                {reply.likes.length ? (
                                  <span class="n">{reply.likes.length}</span>
                                ) : null}
                              </span>
                            ) : (
                              <span className="likes">
                                <FontAwesomeIcon
                                  onClick={() => {
                                    dispatch(ReactOnCommentReply(reply._id));
                                  }}
                                  className="com-unliked"
                                  icon={faHeart}
                                />
                                &nbsp;
                                {reply.likes.length ? (
                                  <span class="n">{reply.likes.length}</span>
                                ) : null}
                              </span>
                            )}
                          </span>
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
                              <span
                                style={{
                                  color: "#dc3545",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setDelRepShow(true);
                                  setRepId(reply._id);
                                }}
                              >
                                Delete
                              </span>
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
              {postCommentReplyIsLoading ? (
                <div style={{ textAlign: "center" }}>
                  <Spinner animation="border" size="sm" role="status" />
                </div>
              ) : null}
              {postCommentReplyError
                ? simpleAlert("danger", postCommentReplyError)
                : null}
              {postCommentReplyMessage
                ? simpleAlert("success", postCommentReplyMessage)
                : null}
              {!postCommentReplyError &&
              !postCommentReplyMessage &&
              !postCommentReplyIsLoading ? (
                <button type="submit">Reply</button>
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
      {!comments?.length ? (
        <p style={{ fontSize: ".8em", textAlign: "center" }}>
          Be the first to comment
        </p>
      ) : null}
      <div className="comment-wrapper">
        {all_comments}
        <DeleteCommentModal
          show={delComShow}
          onHide={() => setDelComShow(false)}
        />
        <EditCommentModal show={edComShow} onHide={() => setEdComShow(false)} />
        <EditReplyModal show={edRepShow} onHide={() => setEdRepShow(false)} />
        <DeleteReplyModal
          show={delRepShow}
          onHide={() => setDelRepShow(false)}
        />
      </div>
      {comments?.length > 1 ? (
        <div className="com-sort">
          <div>
            <button
              className={sort == "top" ? "sort-on" : "sort-off"}
              onClick={() => {
                setSort("top");
              }}
            >
              Top Comments
            </button>
            <button
              className={sort == "new" ? "sort-on" : "sort-off"}
              onClick={() => {
                setSort("new");
              }}
            >
              Newest First
            </button>
          </div>
        </div>
      ) : null}
      <form
        className="com-form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(PostComment(id, e.target.desc.value));
          e.target.reset();
        }}
      >
        <textarea name="desc" />

        {postCommentError ? simpleAlert("danger", postCommentError) : null}
        {postCommentMessage ? simpleAlert("success", postCommentMessage) : null}
        {postCommentIsLoading ? (
          <div style={{ textAlign: "center" }}>
            <br />
            <Spinner animation="border" size="lg" role="status" />
          </div>
        ) : null}
        {postCommentError || postCommentIsLoading ? null : (
          <button stype="submit">Comment</button>
        )}
      </form>
    </div>
  );
};

export default Comments;
