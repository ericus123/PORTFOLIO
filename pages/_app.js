import Layout from "../comps/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import "../styles/globals.css";
import store from "../redux/store"
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Head from "next/head";
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
        <NotificationContainer />
      </Provider>
    </Layout>
  );
}

export default MyApp;
