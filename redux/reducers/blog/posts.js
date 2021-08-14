import { types } from "../../actions/types";

const postsInitialState = {
  message: null,
  error: null,
  isLoading: true,
  searchisLoading: false,
  maxPages: null,
  postsPerPage: [],
  posts: [],
  prevPage: null,
  nextPage: null,
};
const postsByCategoryInitialState = {
  message: null,
  error: null,
  isLoading: true,
  maxPages: null,
  postsPerPage: [],
  posts: [],
  prevPage: null,
  nextPage: null,
};
const searchPostsInitialState = {
  message: null,
  error: null,
  isLoading: false,
  posts: [],
  term: null,
  maxPages: null,
  postsPerPage: [],
  prevPage: null,
  nextPage: null,
};
const postInitialState = {
  message: "",
  error: null,
  isLoading: true,
  post: null,
  comments: null,
  reactionUser: null,
  reactionMsg: "",
  reactionError: null,
  reactionisLoading: false,
};
const postReactionInitState = {
  message: null,
  error: null,
  isLoading: false,
  like: null,
};
const commentReactionInitState = {
  message: null,
  error: null,
  isLoading: false,
  like: null,
};
const replyReactionInitState = {
  message: null,
  error: null,
  isLoading: false,
  like: null,
};
const postReactionsInitState = {
  message: null,
  error: null,
  isLoading: false,
  likes: [],
};

const getPostCatsInitialState = {
  message: "",
  error: null,
  isLoading: true,
  cats: [],
};

const commentsInitialState = {
  message: null,
  error: null,
  isLoading: false,
  comments: [],
};
const delCommentInitialState = {
  message: null,
  error: null,
  isLoading: false,
  comment: null,
};
const commentInitialState = {
  message: null,
  error: null,
  isLoading: false,
  comment: null,
};
const commentReplyInitialState = {
  message: "",
  error: null,
  isLoading: false,
  reply: null,
  commentId: null,
};
const editReplyInitialState = {
  message: "",
  error: null,
  isLoading: false,
  reply: null,
};
const deleteReplyInitialState = {
  message: "",
  error: null,
  isLoading: false,
};
export const posts = (state = postsInitialState, action) => {
  switch (action.type) {
    case types.GET_POSTS_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        postsPerPage: action.payload.postsPerPage.results,
        posts: action.payload.posts,
        maxPages: action.payload.postsPerPage.maxPages,
        prevPage: action.payload.postsPerPage.previous.page,
        nextPage: action.payload.postsPerPage.next.page,
      };

    case types.GET_POSTS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        postsPerPage: [],
        posts: [],
        maxPages: null,
        nextPage: null,
        prevPage: null,
      };

    default:
      return state;
  }
};

export const post = (state = postInitialState, action) => {
  switch (action.type) {
    case types.GET_POST_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        post: action.payload.post,
        comments: action.payload.post.comments,
        error: null,
      };
    case types.GET_POST_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
export const postReaction = (state = postReactionInitState, action) => {
  switch (action.type) {
    case types.POST_REACTION_CLICKED:
      return {
        ...state,
        isLoading: true,
      };
    case types.POST_REACTION_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        like: action.payload.like,
      };
    case types.POST_REACTION_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_POST_REACTION_ERROR:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const commentReaction = (state = commentReactionInitState, action) => {
  switch (action.type) {
    case types.POST_COMMENT_REACTION_ISLOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.POST_COMMENT_REACTION_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        like: action.payload.like,
      };
    case types.POST_COMMENT_REACTION_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_POST_COMMENT_REACTION_ERROR:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const replyReaction = (state = replyReactionInitState, action) => {
  switch (action.type) {
    case types.COMMENT_REPLY_REACTION_ISLOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.COMMENT_REPLY_REACTION_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        like: action.payload.like,
      };
    case types.COMMENT_REPLY_REACTION_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_COMMENT_REPLY_REACTION_ERROR:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const postReactions = (state = postReactionsInitState, action) => {
  switch (action.type) {
    case types.GET_POST_REACTIONS_ISLOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_POST_REACTIONS_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        likes: action.payload.likes,
      };
    case types.GET_POST_REACTIONS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const postsByCat = (state = postsByCategoryInitialState, action) => {
  switch (action.type) {
    case types.GET_POSTS_BY_CAT_ISLOADING:
      return {
        isLoading: true,
      };
    case types.GET_POSTS_BY_CAT_SUCCESS:
      return {
        message: action.payload.message,
        isLoading: false,
        posts: action.payload.posts,
        error: null,
        term: action.payload.term,
        postsPerPage: action.payload.postsPerPage.results,
        maxPages: action.payload.postsPerPage.maxPages,
        prevPage: action.payload.postsPerPage.previous.page,
        nextPage: action.payload.postsPerPage.next.page,
      };
    case types.GET_POSTS_BY_CAT_ERROR:
      return {
        ...state,
        isLoading: false,
        posts: [],
        postsPerPage: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPostCats = (state = getPostCatsInitialState, action) => {
  switch (action.type) {
    case types.GET_POST_CATS_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        cats: action.payload.categories,
      };
    case types.GET_POST_CATS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const postComment = (state = commentInitialState, action) => {
  switch (action.type) {
    case types.POST_COMMENT_CLICKED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.POST_COMMENT_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        comment: action.payload.comment,
        error: null,
      };
    case types.REMOVE_POST_COMMENT_SUCCESS:
      return {
        ...state,
        message: null,
        error: null,
      };
    case types.POST_COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_POST_COMMENT_ERROR:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const editComment = (state = commentInitialState, action) => {
  switch (action.type) {
    case types.EDIT_POST_COMMENT_ISLOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.EDIT_POST_COMMENT_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        comment: action.payload.comment,
        error: null,
      };
    case types.REMOVE_EDIT_POST_COMMENT_SUCCESS:
      return {
        ...state,
        message: null,
        error: null,
      };
    case types.EDIT_POST_COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_EDIT_POST_COMMENT_ERROR:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const deleteComment = (state = delCommentInitialState, action) => {
  switch (action.type) {
    case types.DELETE_POST_COMMENT_ISLOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.DELETE_POST_COMMENT_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        comment: action.payload.comment,
        error: null,
      };
    case types.DELETE_POST_COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_DELETE_POST_COMMENT_ERROR:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const getComments = (state = commentsInitialState, action) => {
  switch (action.type) {
    case types.GET_POST_COMMENTS_ISLOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        comments: action.payload.comments,
        error: null,
      };
    case types.GET_POST_COMMENTS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const postCommentReply = (state = commentReplyInitialState, action) => {
  switch (action.type) {
    case types.POST_COMMENT_REPLY_CLICKED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.POST_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        reply: action.payload.reply,
        error: null,
      };
    case types.REMOVE_POST_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        message: null,
        error: null,
        isLoading: false,
      };
    case types.POST_COMMENT_REPLY_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_POST_COMMENT_REPLY_ERROR:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const editCommentReply = (state = editReplyInitialState, action) => {
  switch (action.type) {
    case types.EDIT_COMMENT_REPLY_CLICKED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.EDIT_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        reply: action.payload.reply,
        error: null,
      };
    case types.REMOVE_EDIT_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        message: null,
        isLoading: false,
        error: null,
      };

    case types.EDIT_COMMENT_REPLY_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_EDIT_COMMENT_REPLY_ERROR:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const deleteCommentReply = (state = deleteReplyInitialState, action) => {
  switch (action.type) {
    case types.DELETE_COMMENT_REPLY_CLICKED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.DELETE_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        error: null,
      };
    case types.DELETE_COMMENT_REPLY_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_DELETE_COMMENT_REPLY_ERROR:
      return {
        ...state,
        error: action.null,
        isLoading: false,
      };
    default:
      return state;
  }
};
export const searchPosts = (state = searchPostsInitialState, action) => {
  switch (action.type) {
    case types.SEARCH_POSTS_CLICKED:
      return {
        ...state,
        isLoading: true,
        term: action.payload,
      };
    case types.SEARCH_POSTS_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        posts: action.payload.posts,
        error: null,
        term: action.payload.term,
        postsPerPage: action.payload.postsPerPage.results,
        maxPages: action.payload.postsPerPage.maxPages,
        prevPage: action.payload.postsPerPage.previous.page,
        nextPage: action.payload.postsPerPage.next.page,
      };
    case types.SEARCH_POSTS_ERROR:
      return {
        ...state,
        posts: [],
        postsPerPage: [],
        error: action.payload,
        term: action.payload.term,
      };
    default:
      return state;
  }
};
