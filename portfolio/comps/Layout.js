import Navigation from "./Navbar";
import { Provider } from "react-redux";
import store from "../redux/store";
const Layout = ({ children }) => {
  return (
    <div>
      <Provider store={store}>
        <Navigation />
        {children}
      </Provider>{" "}
    </div>
  );
};

export default Layout;
