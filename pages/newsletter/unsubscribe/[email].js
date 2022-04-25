import NewsletterUnsubscribe from "../../../comps/newsletter/unsubscribe";
import { decipher } from "../../../helpers";

export const getServerSideProps = async (context) => {
  const email = context.params.email;

  return {
    props: { email },
  };
};

const NewsLetterPage = ({ email }) => {
  const hashedEmail = decipher();
  return <NewsletterUnsubscribe email={hashedEmail(email)} />;
};

export default NewsLetterPage;
