import Layout from "../comps/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";

import store from "../redux/store";
import Navigation from "../comps/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Provider store={store}>
        <Navigation />
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default MyApp;
