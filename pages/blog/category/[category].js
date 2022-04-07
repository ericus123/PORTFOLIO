import { useEffect } from "react";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";
import { getPostsByCat } from "../../../redux/actions/blog/posts";
import { useSelector, useDispatch } from "react-redux";
import PostsList from "../../../comps/blog/PostsList";
import BlogLayout from "../../../comps/layouts/BlogLayout";
import AdBanner from "../../../comps/ads";
import { SpinningLoader } from "../../../comps/loaders";
// import { CategoryHeader } from "../../../comps/blog/category";

const PostsByCategory = () => {
  const isLoading = useSelector((state) => state.postsByCat.isLoading);
  const error = useSelector((state) => state.postsByCat.error);
  const catPosts = useSelector((state) => state.postsByCat.posts);
  const router = useRouter();

  const dispatch = useDispatch();
  const page = 1;
  useEffect(() => {
    dispatch(getPostsByCat(router.query.category));
  }, [page, router.query.category]);

  // const breadCrumb =
  //   catPosts && !isLoading ? (
  //     <CategoryHeader category={router.query.category} />
  //   ) : null;

  const err = error ? <Alert variant="danger">{error}</Alert> : null;
  return (
    <BlogLayout showSlider={false}>
      <ul className="list-unstyled">
        <SpinningLoader isLoading={isLoading} />
        {err}
        {/* {breadCrumb} */}
        {
          <PostsList
            posts={catPosts.slice().sort((a, b) => (b.date > a.date ? 1 : -1))}
          />
        }
        <AdBanner
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-slot="1965117589"
        />
      </ul>
    </BlogLayout>
  );
};
PostsByCategory.getInitialProps = ({ query: { category } }) => {
  return { category };
};
export default PostsByCategory;
