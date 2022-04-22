import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SpinningLoader } from "../../loaders";

const useProtectedRoute = (Component) => (props) => {
  const { user, isLoading, isLoggedIn } = useSelector(
    (state) => state.checkAuth
  );
  const router = useRouter();

  useEffect(() => {
    if (isLoading && isLoggedIn) {
      router.push("/login");
      return <SpinningLoader />;
    }
  }, []);
  return <Component user={user} {...props} />;
};

export default useProtectedRoute;
