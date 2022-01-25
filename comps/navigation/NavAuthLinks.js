import unknown_avatar from "../../public/images/avatar.png";
import {
  ArrowRightCircleFill,
  ArrowLeftCircleFill,
  PersonPlusFill,
  PersonCircle,
} from "react-bootstrap-icons";
import { Nav, NavDropdown } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const NavAuthLinks = () => {
  const router = useRouter();
  const user = useSelector((state) => state.checkAuth.user);
  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };
  return (
    (user || router.route !== "/") && (
      <Nav>
        {user ? (
          <NavDropdown
            title={
              <>
                <div className="profile-picture">
                  <Image
                    src={user?.avatar || unknown_avatar}
                    width={40}
                    height={40}
                    quality={25}
                    priority
                  />
                </div>
              </>
            }
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item href="/profile">
              {" "}
              <PersonCircle />
              &nbsp;Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => logout()}>
              <ArrowLeftCircleFill />
              &nbsp;Signout
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <>
            <Nav.Link href="/login" className="login-btn">
              <ArrowRightCircleFill />
              &nbsp;Login
            </Nav.Link>
            <Nav.Link href="/signup" className="signup-btn">
              <PersonPlusFill />
              &nbsp;Register
            </Nav.Link>
          </>
        )}
      </Nav>
    )
  );
};

export default NavAuthLinks;
