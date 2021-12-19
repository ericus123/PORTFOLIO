import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import http from "../../utils/axios/axios";
import SideBar from "../../comps/blog/sidebar/sideBar";
import ScrolButton from "../../reusables/ScrollUp";
import Head from "next/head";
import PostsDetails from "../../comps/blog/PostDetails";
import BlogLayout from "../../comps/layouts/BlogLayout";

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
      <BlogLayout showSlider={false}>
        <div className="single-post">
          <PostsDetails post={post} />
        </div>
      </BlogLayout>
    </>
  );
};

export default SinglePost;
