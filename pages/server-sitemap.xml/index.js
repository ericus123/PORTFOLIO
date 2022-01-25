import { getServerSideSitemap } from "next-sitemap";
import http from "../../utils/axios/axios";

export const getServerSideProps = async (ctx) => {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const res = await http.get("/api/posts/all/active");

  const fields = res.data.posts.map((post) => ({
    loc: `${baseUrl}/${post.slug}`,
    lastmod: post.createdAt,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
