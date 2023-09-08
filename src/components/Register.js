import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  function validate(field, label) {
    if (!field) {
      alert("Error: " + label);
      return false;
    }
    if (firstName.length > 50) {
      alert("Please enter less than 50 characters for first name");
      return false;
    }
    if (lastName.length > 50) {
      alert("Please enter less than 50 characters for last name");
      return false;
    }
    if (email.length > 50) {
      alert("Please enter less than 50 characters for email");
      return false;
    }
    if (password.length > 50) {
      alert("Please enter less than 50 characters for password");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate(firstName, "Please enter your first name")) return;
    if (!validate(lastName, "Please enter your last name")) return;
    if (!validate(email, "Please enter your email")) return;
    if (!validate(password, "Please enter a password")) return;

    // Perform account creation logic here
    fetch("http://localhost:3010/users/newUser", {
      method: "POST",
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
        // Handle the response from the server
        console.log(data);
        const message = "Email already exists";
        if (message === data.message) {
          alert(
            "This email is already associated with an account. Please enter a different email."
          );
          window.location.href = "../register";
        } else {
          alert("Account created! Please Log In to Continue.");
          navigate("../login");
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Create Account</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Create Account
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Register;
