import { types } from "../../actions/types";

const postsInitialState = {
  message: "",
  error: null,
  isLoading: true,
  searchisLoading: false,
  maxPages: null,
  postsPerPage: [],
  posts: [],
  prevPage: null,
  nextPage: null,
};
const postsCategoryInitialState = {
  message: "",
  error: null,
  isLoading: true,
  posts: [],
};
const searchPostsInitialState = {
  message: null,
  error: null,
  isLoading: false,
  posts: [],
  term: null,
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

const commentInitialState = {
  message: "",
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

export const postsByCat = (state = postsCategoryInitialState, action) => {
  switch (action.type) {
    case types.GET_POSTS_BY_CAT_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        posts: action.payload.posts,
        error: null,
      };
    case types.GET_POSTS_BY_CAT_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
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
    case types.POST_COMMENT_ERROR:
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
    case types.POST_COMMENT_REPLY_ERROR:
      return {
        ...state,
        error: action.payload,
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
      };
    case types.SEARCH_POSTS_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        posts: action.payload.posts,
        term: action.payload.term,
        error: null,
      };
    case types.SEARCH_POSTS_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
