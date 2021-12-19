import Navigation from "../comps/navigation/Navbar";
import { Provider } from "react-redux";
import store from "../redux/store";
import Footer from "./footer";
const Layout = ({ children }) => {
  return (
    <div>
      <Provider store={store}>
        <Navigation />

        {children}
        <Footer />
      </Provider>{" "}
    </div>
  );
};

export default Layout;
