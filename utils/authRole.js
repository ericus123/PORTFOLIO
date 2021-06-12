import { NavDropdown } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/fontawesome-free-solid";

export const authRole = async () => {
  const user = await jwt_decode(localStorage.getItem("auth-token"));
  console.log(user);

  if (user.role === "admin" || user.role === "superAdmin") {
    return (
      <NavDropdown.Item className="link" href="#dashboard">
        <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
      </NavDropdown.Item>
    );
  } else {
    return null;
  }
};
