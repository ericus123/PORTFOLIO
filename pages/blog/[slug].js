import http from "../../utils/axios/axios";
import Head from "next/head";
import PostsDetails from "../../comps/blog/PostDetails";
import BlogLayout from "../../comps/layouts/BlogLayout";
import AdBanner from "../../comps/ads";

export const getStaticPaths = async () => {
  const res = await http.get("/api/posts");
  const data = await res.data?.posts;
  const paths = data?.map((post) => {
    return {
      params: { slug: post.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;

  const res = await http.get(`/api/posts/${slug}`);
  const post = await res.data.post[0];

  return {
    props: {post,slug },
  };
};
const SinglePost = ({ post }) => {
  const frontendURL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>AMANI Eric | Blog</title>
        <meta name="title" content={post.title} />
        <meta
          name="description"
          content={
            post?.description?.replace(/(<([^>]+)>)/gi, "").substr(0, 250) + "..."
          }
        />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${frontendURL}/blog/${post._id}`} />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={
            post?.description?.replace(/(<([^>]+)>)/gi, "").substr(0, 250) + "..."
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
            post?.description?.replace(/(<([^>]+)>)/gi, "").substr(0, 250) + "..."
          }
        />
        <meta property="twitter:image" content={`${post.imageUrl}`} />
      </Head>
      <BlogLayout showSlider={false}>
        <div className="single-post">
        {post &&   <PostsDetails post={post} />} 
          <br />
          <AdBanner
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-slot="1965117589"
          />
        </div>
      </BlogLayout>
    </>
  );
};

export default SinglePost;
