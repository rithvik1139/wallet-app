import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function NavBar2() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleLogout = () => {
    setUser(null);
    navigate("../");
  };

  if (!user) {
    window.location.href = "../login";
    console.log(user);
  }

  const handleNavLinkClick = (route) => {
    switch (route) {
      case "/newCard":
        navigate("../newCard");
        break;
      case "/viewCards":
        navigate("../viewCards");
        break;
      case "/editUser":
        navigate("../editUser");
        break;
      case "/logout":
        handleShow();
        break;
      default:
        setUser(null);
    }
  };

  return (
    <div>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>
              <Nav.Link onClick={() => handleNavLinkClick("/viewCards")}>
                Wallet Home
              </Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => handleNavLinkClick("/newCard")}>
                  New Card
                </Nav.Link>
                <Nav.Link onClick={() => handleNavLinkClick("/logout")}>
                  Logout
                </Nav.Link>
              </Nav>
              <Nav>
                <Navbar.Text>Welcome, </Navbar.Text>
                <Nav.Link onClick={() => handleNavLinkClick("/editUser")}>
                  {user.first_name} {user.last_name}
                </Nav.Link>
                <Navbar.Text>!</Navbar.Text>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Are you sure you want to Logout?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default NavBar2;
