import Layout from "../comps/Layout";
import "../styles/globals.scss";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import Prism from "prismjs";
import { useEffect } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Provider } from "react-redux";
import "../public/nprogress.scss";
import store from "../redux/store";
import "../styles/prism.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    var ads = document?.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        // eslint-disable-next-line no-undef
        (adsbygoogle = window.adsbygoogle || []).push({});
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }, [router.asPath]);

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <>
      <Head>
        <script
          data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
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
