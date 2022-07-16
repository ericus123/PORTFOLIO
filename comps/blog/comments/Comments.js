import { QuestionCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import unknown_avatar from "../../../public/images/avatar.png";
import { authRequest } from "../../../redux/actions/auth/checkAuth";
import {
  DeleteCommentReply,
  DeletePostComment,
  EditCommentReply,
  EditPostComment,
  GetComments,
  PostComment,
  PostCommentReply,
  ReactOnCommentReply,
  ReactOnPostComment,
} from "../../../redux/actions/blog/posts";
import PopConfirm from "../../popups/popComfirm";
import CommentBox from "./CommentBox";
import CommentReactions from "./CommentReactions";
import CommentsBlocked from "./CommentsBlocked";
import HighLightAuthor from "./HighlightAuthor";
import styles from "./index.module.scss";

const Comments = ({ id, post }) => {
  const [reply, setReply] = useState(null);
  const [edComShow, setEdComShow] = useState(false);
  const [edRepShow, setEdRepShow] = useState(false);
  const [comId, setComId] = useState(null);
  const [repId, setRepId] = useState(null);

  const {
    isLoading: postCommentIsLoading,
    error: postCommentError,
    message: postCommentMessage,
  } = useSelector((state) => state.postComment);
  const {
    error: editCommentError,
    message: editCommentMessage,
    isLoading: editCommentIsLoading,
  } = useSelector((state) => state.editComment);

  const { comments } = useSelector((state) => state.getComments);

  const {
    error: editReplyError,
    message: editReplyMessage,
    isLoading: editReplyIsLoading,
  } = useSelector((state) => state.editCommentReply);

  const {
    error: deleteReplyError,
    mesage: deleteReplyMessage,
    isLoading: deleteReplyIsLoading,
  } = useSelector((state) => state.deleteCommentReply);

  const {
    error: deleteCommentError,
    mesage: deleteCommentMessage,
    isLoading: deleteCommentIsLoading,
  } = useSelector((state) => state.deleteComment);

  const {
    error: postCommentReplyError,
    reply: postCommentReply,
    isLoading: postCommentReplyIsLoading,
  } = useSelector((state) => state.postCommentReply);

  const { error: commentReactionError, message: commentReactionMessage } =
    useSelector((state) => state.commentReaction);

  const {
    error: replyReactionError,
    isLoading: replyReactionIsLoading,
    message: replyReactionMessage,
  } = useSelector((state) => state.replyReaction);

  const { user } = useSelector((state) => state.checkAuth);

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
    editReplyMessage,
    deleteReplyIsLoading,
    commentReactionMessage,
    replyReactionMessage,
    postCommentMessage,
  ]);

  useEffect(() => {
    setEdComShow(false);
    setComId(null);
  }, [editCommentMessage]);

  useEffect(() => {
    setReply(null);
  }, [postCommentReply]);
  useEffect(() => {
    setEdRepShow(false);
    setRepId(null);
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
        router.push("/login?back=true");
      }
    });
  }, errors_arr);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(PostComment(id, e.target.desc.value));
    e.target.reset();
  };

  const handleEdReplyShow = () => {
    setEdRepShow(!edRepShow);
    setRepId(null);
  };
  const handleEdCommentShow = () => {
    setEdComShow(!edComShow);
    setComId(null);
  };

  const all_comments = comments?.map((comment) => {
    return (
      <div className="comment" key={comment._id}>
        <div className="profile-picture-sm">
          <Image
            width="40px"
            height="40px"
            src={comment?.user?.avatar || unknown_avatar}
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
                <i style={{ fontSize: "smaller" }}>edited</i>
              </span>
            ) : null}
          </p>
          <HighLightAuthor
            postAuthor={post?.author._id}
            dataAuthor={comment?.user?._id}
          />
          {(comId == comment._id && (
            <CommentBox
              show={edComShow}
              content={comment.description}
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(EditPostComment(comId, e.target.desc.value));
              }}
              error={null}
              button="Update"
              onCancel={handleEdCommentShow}
              isLoading={editCommentIsLoading}
            />
          )) || <p className="text">{comment.description}</p>}
          {!comId && comId !== comment._id && !edComShow && (
            <p>
              <CommentReactions
                data={comment}
                onClick={() => {
                  dispatch(ReactOnPostComment(comment._id));
                }}
                user={user}
              />
              {user && (
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
              )}
              &nbsp;&nbsp;&nbsp;
              {user && user.id == comment.user?._id ? (
                <>
                  {" "}
                  <span
                    style={{ color: "#17a2b8", cursor: "pointer" }}
                    onClick={() => {
                      handleEdCommentShow();
                      setComId(comment._id);
                    }}
                  >
                    {/* {comId !== comment._id && !reply && !edComShow & null} */}
                    {reply !== comment._id && "Edit"}
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
          )}
          <div className="replies">
            {comment.replies
              ? comment.replies.map((reply) => {
                  return (
                    <div className="reply" key={reply._id}>
                      <div className={`profile-p-sm ${styles.user_img}`}>
                        <Image
                          className={`${styles.user_img} b-border`}
                          src={reply?.user?.avatar || unknown_avatar}
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
                              <i style={{ fontSize: "smaller" }}>edited</i>
                            </span>
                          ) : null}
                        </p>

                        <HighLightAuthor
                          postAuthor={post?.author._id}
                          dataAuthor={reply?.user?._id}
                        />
                        {(repId == reply._id && (
                          <CommentBox
                            show={edRepShow}
                            content={reply.description}
                            onSubmit={(e) => {
                              e.preventDefault();
                              dispatch(
                                EditCommentReply(repId, e.target.desc.value)
                              );
                            }}
                            error={editReplyError || ""}
                            button="Update"
                            onCancel={handleEdReplyShow}
                            isLoading={editReplyIsLoading}
                          />
                        )) || <p className="text">{reply.description}</p>}

                        {repId !== reply._id && !edRepShow && (
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
                                    handleEdReplyShow();
                                    setRepId(reply._id);
                                  }}
                                >
                                  {repId !== reply._id && !edRepShow && "Edit"}
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
                        )}
                      </div>
                    </div>
                  );
                })
              : null}

            <CommentBox
              show={reply == comment._id}
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(PostCommentReply(comment._id, e.target.desc.value));
              }}
              button="Reply"
              onCancel={() => setReply(null)}
              isLoading={postCommentReplyIsLoading}
              error={postCommentReplyError}
            />
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
      <div className="comment-wrapper">{all_comments}</div>
      {/* <CommentsSort comments={comments} /> */}

      {(user && (
        <CommentBox
          onSubmit={handleSubmit}
          error={postCommentError}
          IsLoading={postCommentIsLoading}
          show={true}
          button="Comment"
        />
      )) || <CommentsBlocked />}
    </div>
  );
};

export default Comments;
