import { combineReducers } from "redux";
import login from "./auth/loginReducer";
import { passResetRequest, changePassword } from "./auth/passwordReducer";
import { signup, confirmEmail } from "./auth/signupReducer";
import { sendConfirmation } from "./auth/emailReducer";
import checkAuth from "./auth/checkAuth";
import {
  posts,
  postsByCat,
  post,
  getPostCats,
  searchPosts,
  postComment,
  postCommentReply,
  postReaction,
  postReactions
} from "./blog/posts";
import { sendMessage } from "./contact/index";
import { subscribeNewsletter } from "./subscriptions/newsLetter";
// function that contains all reducer objects.
const allReducers = combineReducers({
  signup,
  login,
  posts,
  post,
  sendMessage,
  postsByCat,
  getPostCats,
  searchPosts,
  postComment,
  postCommentReply,
  postReaction,
  confirmEmail,
  subscribeNewsletter,
  passResetRequest,
  changePassword,
  sendConfirmation,
  checkAuth,
  postReactions
});

export default allReducers;
