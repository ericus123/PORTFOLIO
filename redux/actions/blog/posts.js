import { types } from "../types";
import http from "../../../utils/axios/axios";
import { errorMessage } from "../../../comps/popups/popupMessages";

export const getPosts = (page, limit) => async (dispatch) => {
  try {
    const res = await http.get(
      `/api/posts/all/active?page=${page}&limit=${limit}`
    );
    dispatch({ type: types.GET_POSTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.GET_POSTS_ERROR,
      payload: error.response.data.error || "Error occured",
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await http.get(`/api/posts/${id}`);
    dispatch({ type: types.GET_POST_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_POST_ERROR,
      payload: error.response.data.error || "Error occured",
    });
  }
};
export const ReactOnPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.POST_REACTION_CLICKED });
    const res = await http.post(`/api/posts/reactions/${id}`);
    dispatch({ type: types.POST_REACTION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.POST_REACTION_ERROR,
      payload: error.response.data.error || "Error occured",
    });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_POST_REACTION_ERROR,
        payload: error.response.data.error || "Error occured",
      });
    }, 5000);
  }
};
export const getPostReactions = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_POST_REACTIONS_ISLOADING });
    const res = await http.get(`/api/posts/reactions/${id}`);
    dispatch({ type: types.GET_POST_REACTIONS_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: types.GET_POST_REACTIONS_ERROR,
      payload: error.response.data.error || "Error occured",
    });
  }
};

export const getPostsByCat = (cat, p) => async (dispatch) => {
  try {
    const res = await http.get(`/api/posts/categories/${cat}?page=${p}`);
    dispatch({ type: types.GET_POSTS_BY_CAT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.GET_POSTS_BY_CAT_ERROR,
      payload: error.response.data.error || "Error occured",
    });
  }
};

export const getPostCats = () => async (dispatch) => {
  try {
    const res = await http.get("/api/posts/categories");
    dispatch({ type: types.GET_POST_CATS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.GET_POST_CATS_ERROR,
      payload: error.response.data.error || "Error occured",
    });
  }
};

export const searchPostsRequest = (q, p, l) => async (dispatch) => {
  try {
    dispatch({ type: types.SEARCH_POSTS_CLICKED, payload: q });
    const res = await http.get(
      `/api/posts/search?term=${q}&page=${p}&limit=${l}`
    );
    dispatch({ type: types.SEARCH_POSTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.SEARCH_POSTS_ERROR,
      payload: error.response.data.error || "Error occured",
    });
  }
};
export const PostComment = (postId, desc) => async (dispatch) => {
  try {
    dispatch({ type: types.POST_COMMENT_CLICKED });
    const res = await http.post(`/api/posts/comments/${postId}`, {
      description: desc,
    });
    dispatch({ type: types.POST_COMMENT_SUCCESS, payload: res.data });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_POST_COMMENT_SUCCESS,
      });
    }, 5000);
  } catch (error) {
    dispatch({
      type: types.POST_COMMENT_ERROR,
      payload:
        error.response.data.error || errorMessage("Something went wrong"),
    });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_POST_COMMENT_ERROR,
      });
    }, 5000);
  }
};

export const EditPostComment = (commentId, desc) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_POST_COMMENT_ISLOADING });
    const res = await http.patch(`/api/posts/comments/${commentId}`, {
      description: desc,
    });
    dispatch({ type: types.EDIT_POST_COMMENT_SUCCESS, payload: res.data });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_EDIT_POST_COMMENT_SUCCESS,
      });
    }, 5000);
  } catch (error) {
    dispatch({
      type: types.EDIT_POST_COMMENT_ERROR,
      payload:
        error.response.data.error || errorMessage("Something went wrong"),
    });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_EDIT_POST_COMMENT_ERROR,
      });
    }, 5000);
  }
};

export const ReactOnPostComment = (commentId) => async (dispatch) => {
  try {
    dispatch({ type: types.POST_COMMENT_REACTION_ISLOADING });
    const res = await http.post(`/api/posts/comments/${commentId}/react`);
    dispatch({ type: types.POST_COMMENT_REACTION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.POST_COMMENT_REACTION_ERROR,
      payload:
        error.response.data.error || errorMessage("Something went wrong"),
    });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_POST_COMMENT_REACTION_ERROR,
      });
    }, 5000);
  }
};

export const ReactOnCommentReply = (replyId) => async (dispatch) => {
  try {
    dispatch({ type: types.COMMENT_REPLY_REACTION_ISLOADING });
    const res = await http.post(`/api/posts/replies/${replyId}/react`);
    dispatch({ type: types.COMMENT_REPLY_REACTION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.COMMENT_REPLY_REACTION_ERROR,
      payload:
        error.response.data.error || errorMessage("Something went wrong"),
    });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_COMMENT_REPLY_REACTION_ERROR,
      });
    }, 5000);
  }
};

export const DeletePostComment = (commentId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_POST_COMMENT_ISLOADING });
    const res = await http.delete(`/api/posts/comments/${commentId}`);
    dispatch({ type: types.DELETE_POST_COMMENT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.DELETE_POST_COMMENT_ERROR,
      payload:
        error.response.data.error || errorMessage("Something went wrong"),
    });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_DELETE_POST_COMMENT_ERROR,
      });
    }, 5000);
  }
};

export const GetComments = (postId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_POST_COMMENTS_ISLOADING });
    const res = await http.get(`/api/posts/comments/${postId}`);
    dispatch({ type: types.GET_POST_COMMENTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.GET_POST_COMMENTS_ERROR,
      payload:
        error.response.data.error || errorMessage("Something went wrong"),
    });
  }
};

export const PostCommentReply = (commentId, desc) => async (dispatch) => {
  try {
    dispatch({ type: types.POST_COMMENT_REPLY_CLICKED });
    const res = await http.post(`/api/posts/replies/${commentId}`, {
      description: desc,
    });
    dispatch({ type: types.POST_COMMENT_REPLY_SUCCESS, payload: res.data });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_POST_COMMENT_REPLY_SUCCESS,
      });
    }, 5000);
  } catch (error) {
    dispatch({
      type: types.POST_COMMENT_REPLY_ERROR,
      payload: error.response.data.error || "Error occured",
    });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_POST_COMMENT_REPLY_ERROR,
      });
    }, 5000);
  }
};

export const EditCommentReply = (replyId, desc) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_COMMENT_REPLY_CLICKED });
    const res = await http.patch(`/api/posts/replies/${replyId}`, {
      description: desc,
    });
    dispatch({ type: types.EDIT_COMMENT_REPLY_SUCCESS, payload: res.data });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_EDIT_COMMENT_REPLY_SUCCESS,
      });
    }, 5000);
  } catch (error) {
    dispatch({
      type: types.EDIT_COMMENT_REPLY_ERROR,
      payload:
        error.response.data.error || errorMessage("Something went wrong"),
    });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_EDIT_COMMENT_REPLY_ERROR,
      });
    }, 5000);
  }
};

export const DeleteCommentReply = (replyId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_COMMENT_REPLY_CLICKED });
    const res = await http.delete(`/api/posts/replies/${replyId}`);
    dispatch({ type: types.DELETE_COMMENT_REPLY_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.DELETE_COMMENT_REPLY_ERROR,
      payload:
        error.response.data.error || errorMessage("Something went wrong"),
    });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_DELETE_COMMENT_REPLY_ERROR,
        payload:
          error.response.data.error || errorMessage("Something went wrong"),
      });
    }, 5000);
  }
};

export const PostReaction = (postId, action) => async (dispatch) => {
  try {
    dispatch({ type: types.POST_REACTION_CLICKED });
    const res = await http.patch(`/api/posts/${postId}/${action}`);
    dispatch({ type: types.POST_REACTION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.POST_REACTION_ERROR,
      payload:
        error.response.data.error || errorMessage("Something went wrong"),
    });
  }
};
