import Layout from "../comps/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import "../styles/globals.css";
import store from "../redux/store";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Head from "next/head";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          data-ad-client="ca-pub-6149905527184076"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6149905527184076"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
          <NotificationContainer />
        </Provider>
      </Layout>
    </>
  );
}

export default MyApp;
