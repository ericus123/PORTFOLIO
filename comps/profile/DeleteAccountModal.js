import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteAccountToken } from "../../redux/actions/profile/profile";

const DeleteAccountModal = ({ deleteTokenIsLoading, onHide }) => {
  const dispatch = useDispatch();
  return (
    <Modal size="md" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Body>
        <h4>Delete account</h4>
        <p>
          Are you sure you want to delete your account?
          <br />
          This action can&apos;t be undone{" "}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={deleteTokenIsLoading}
          onClick={() => {
            dispatch(deleteAccountToken());
          }}
        >
          {deleteTokenIsLoading ? (
            <Spinner size="sm" animation="border"></Spinner>
          ) : (
            "Yes"
          )}
        </Button>
        <Button variant="danger" onClick={onHide}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAccountModal;
