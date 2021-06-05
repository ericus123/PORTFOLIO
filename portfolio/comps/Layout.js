import Navigation from "./Navbar";
import { Provider } from "react-redux";
import store from "../redux/store";
const Layout = ({ children }) => {
  console.log(
    "HERE IS THE PUBLIC BACKEND URL " + process.env.NEXT_PUBLIC_BACKEND_URL
  );
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
