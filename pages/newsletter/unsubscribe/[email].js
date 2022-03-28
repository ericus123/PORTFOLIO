import NewsletterUnsubscribe from "../../../comps/newsletter/unsubscribe";

export const getServerSideProps = async (context) => {
  const email = context.params.email;
  return {
    props: { email },
  };
};

const NewsLetterPage = ({ email }) => {
  return <NewsletterUnsubscribe email={email} />;
};

export default NewsLetterPage;
