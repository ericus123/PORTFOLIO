import "../styles/globals.scss";
import Layout from "../comps/Layout";

import { Provider } from "react-redux";
import store from "../redux/store";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "../public/nprogress.scss";
import NProgress from "nprogress";

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
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
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
