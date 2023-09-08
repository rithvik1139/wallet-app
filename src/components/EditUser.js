import React, { useState, useContext } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import UserContext from "../UserContext";

function EditUser() {
  const { user, setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!user){
    window.location.href = "../login";
    console.log(user);
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validate = (field, label) => {
    if(!field){
      alert("Error: " + label);
      return false;
    }
    if(firstName.length > 50){
      alert("Please enter less than 50 characters for first name");
      return false;
    }
    if(lastName.length > 50){
      alert("Please enter less than 50 characters for last name");
      return false;
    }
    if(email.length > 50){
      alert("Please enter less than 50 characters for email");
      return false;
    }
    if(password.length > 50){
      alert("Please enter less than 50 characters for password");
      return false;
    }
    return true;
  }
  const handleCloseDelete = () => setShowDeleteModal(false);
  const handleShowDelete = () => setShowDeleteModal(true);
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if(!validate(firstName, "enter your first name")) return;
    if(!validate(lastName, "enter your last name")) return;
    if(!validate(email, "enter your email")) return;
    if(!validate(password, "enter a password")) return;
    
        // Perform the update API call using the updated user data
    fetch(`http://localhost:3010/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update response:", data);
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
      alert("Card has now been updated.")
      setUser(null);
    
  };
  const handleDeleteProfile = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3010/users/${user.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log(`User with id ${user.id} has been deleted.`);
          // Perform any additional actions after successful deletion
          alert("User and all associated cards have been deleted");
          setUser(null);
        } else {
          alert(`Failed to delete user: ${user.firstName} ${user.lastName}.`);
          // Handle error response
        }
      })
      .catch((error) => {
        console.error(
          `An error occurred while deleting user with id: ${user.id}:`,
          error
        );
      });
  };

  return (
    <div>
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Edit User Profile</Card.Title>
            <Card.Body>
            To edit your profile, ensure all fields are filled with the desired edits and/or values that remain the same. <br />WARNING: Updating your profile will log you out and you must log in again to see the changes reflected on your profile.
          </Card.Body>
            <Form onSubmit={handleUpdateProfile}>
              <Form.Group controlId="formFirstName">
                <Form.Label>Edit First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Edit Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Edit Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter new email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Edit Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit">
                Update Profile
              </Button>&nbsp;&nbsp;
              <Button variant="danger" onClick={handleShowDelete}>
              Delete Profile
            </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Modal
          show={showDeleteModal}
          onHide={handleCloseDelete}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Are you sure you want to delete your profile?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            WARNING: All cards associated with profile will be removed in this
            process and cannot be recovered.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDeleteProfile}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default EditUser;
