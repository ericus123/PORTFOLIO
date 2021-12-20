import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount } from "../../../redux/actions/profile/profile";
import { Spinner } from "react-bootstrap";
import { simpleAlert } from "../../../comps/Alerts";
export const getServerSideProps = async (context) => {
  const token = context.params.token;
  return {
    props: { token: token },
  };
};
const DeleteAccount = ({ token }) => {
  const deleteAccountError = useSelector((state) => state.deleteAccount.error);
  const deleteAccountMessage = useSelector(
    (state) => state.deleteAccount.message
  );
  const deleteAccountIsLoading = useSelector(
    (state) => state.deleteAccount.isLoading
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deleteAccount(token));
  }, []);
  return (
    <div className="del_acc">
      {deleteAccountError ? simpleAlert("danger", deleteAccountError) : null}
      {deleteAccountMessage
        ? simpleAlert("success", deleteAccountMessage)
        : null}
      {deleteAccountIsLoading ? (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" size="md" role="status"></Spinner>
        </div>
      ) : null}
    </div>
  );
};

export default DeleteAccount;
