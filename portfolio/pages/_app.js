import Layout from "../comps/Layout";
import "../styles/globals.css";
import { Provider } from "react-redux";

import store from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default MyApp;
