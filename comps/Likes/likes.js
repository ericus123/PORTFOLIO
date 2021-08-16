import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  faHeart,
  faHandHoldingHeart,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactOnPost, getPostReactions } from "../../redux/actions/blog/posts";
import { authRequest } from "../../redux/actions/auth/checkAuth";
import { css } from "@emotion/react";
import {BounceLoader} from "react-spinners";

export const BigLike = ({ id }) => {

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  const dispatch = useDispatch();
  const postReactions = useSelector((state) => state.postReactions.likes);
  const error = useSelector((state) => state.postReaction.error);
  const postReaction = useSelector((state) => state.postReaction.msg);
   const isLoading = useSelector((state) => state.postReaction.isLoading);
  const isLoggedIn = useSelector((state) => state.checkAuth.isLoggedIn);
  const user = useSelector((state) => state.checkAuth.user);
  const [btn, setClicked] = useState(false);
  const [liked, setStatus] = useState("bg-unliked");
  let likesLen = postReactions.length ? postReactions.length : null;
  const router = useRouter();
  let hasLiked =
    postReactions.length && user
      ? postReactions.filter((reaction) => reaction.user === user.id)
      : [];
  let status = "bg-unliked";
  const setColor = () => {
    status = isLoggedIn && hasLiked.length ? "bg-liked" : "bg-unliked";
    setStatus(status);
  };
  useEffect(() => {
    dispatch(getPostReactions(id));
    setColor();
  }, [btn]);
  useEffect(() => {
    setColor();
  }, [postReactions]);
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    dispatch(authRequest(token));
    if (error === "Invalid Token") {
      localStorage.clear();
      router.push("/login");
    }
  }, [error]);

  return (

<div className="big-like" >
      {postReactions ? (
        
        
          !isLoading ? <span className="likes">
          <FontAwesomeIcon
            className={liked}
            icon={faHandHoldingHeart}
            onClick={() => {
              setClicked(!btn);
              dispatch(ReactOnPost(id));
            }}
          />
          <span class="n">{likesLen}</span>
        </span> : null 
        
      ) : null}

      <BounceLoader style={{display: isLoading ? "none": "block", textAlign:"center"}} color={"#000"} loading={isLoading} css={override} size={35} />

    </div>
      
 );
};
