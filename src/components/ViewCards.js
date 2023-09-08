import React, { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Button,
  Modal,
  Container,
  ListGroup,
  Col,
  Row,
} from "react-bootstrap";

function ViewCards() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const id = user.id;
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEdit = () => setShowEditModal(false);
  const handleShowEdit = () => setShowEditModal(true);

  const [cardId, setCardId] = useState("");
  const [isCardIdValid, setIsCardIdValid] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [isSerialNumberValid, setIsSerialNumberValid] = useState(false);
  const [cvv, setCvv] = useState("");
  const [isCvvValid, setIsCvvValid] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");
  const [isExpirationDateValid, setIsExpirationDateValid] = useState(false);
  const [cardType, setCardType] = useState("");
  const [isCardTypeValid, setIsCardTypeValid] = useState(false);
  const validateSerialNumber = (input) => {
    const sanitizedInput = input.replace(/\s|-/g, "");
    return /^\d{16}$/.test(sanitizedInput);
  };
  const validateCvv = (input) => {
    const sanitizedInput = input.replace(/\s|-/g, "");
    return /^\d{3}$/.test(sanitizedInput);
  };
  const validateExpirationDate = (input) => {
    const currentDate = new Date();
    const [inputMonth, inputYear] = input.split("/");
    const inputDate = new Date(`20${inputYear}`, inputMonth - 1);
    return (
      /^\d{2}\/\d{2}$/.test(input) &&
      inputDate >= currentDate &&
      inputDate.getMonth() === inputMonth - 1
    );
  };
  const validateCardId = (input) => {
    // make sure its a number
    if (isNaN(input)) {
      return false;
    }
    // make sure its a value that the user has access to
    console.log(cards);
    const cardIdsArray = cards.map((card) => card.id);
    if (!cardIdsArray.includes(input)) {
      return false;
    }
    return true;
  };

  if (!user) {
    window.location.href = "../login";
    console.log(user);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "serialNumber") {
      setSerialNumber(value);
      setIsSerialNumberValid(validateSerialNumber(value));
    } else if (name === "cvv") {
      setCvv(value);
      setIsCvvValid(validateCvv(value));
    } else if (name === "expirationDate") {
      setExpirationDate(value);
      setIsExpirationDateValid(validateExpirationDate(value));
    } else if (name === "cardType") {
      setCardType(value);
      setIsCardTypeValid(value === "debit" || value === "credit");
    } else if (name === "cardId") {
      setCardId(value);
      setIsCardIdValid(validateCardId(value));
    }
  };
  const handleEditCard = (event) => {
    event.preventDefault();

    if (
      isSerialNumberValid &&
      isCvvValid &&
      isExpirationDateValid &&
      isCardTypeValid &&
      isCardIdValid
    ) {
      // Perform action on valid submission
      fetch(`http://localhost:3010/cards/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          card_type: cardType,
          serial_number: Number(serialNumber),
          cvv: Number(cvv),
          expiration_date: expirationDate,
          user_id: user.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          console.log(data);
          alert("Card has been editted successfully!");
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error("Error:", error);
        });
      alert("Card has now been updated.");
      setShowEditModal(false);
      navigate("../editCard");
    } else {
      // Handle invalid submission
      console.log("Invalid input");
    }
  };
  const handleDeleteCard = (e) => {
    e.preventDefault();

    if (isCardIdValid) {
      fetch(`http://localhost:3010/cards/${cardId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Card with id ${cards.id} has been deleted.`);
            // Perform any additional actions after successful deletion
            // alert("Card has been deleted.");
            navigate("../editCard");
          } else {
            alert(`Failed to delete card with id: ${cards.id}.`);
            // Handle error response
          }
        })
        .catch((error) => {
          console.error(
            `An error occurred while deleting card with id: ${cards.id}.`,
            error
          );
        });
    }
  };

  const serialNumberSeparator = (value) => {
    const unspacedSerialNumber = value;
    const spacedSerialNumber = unspacedSerialNumber.replace(/(.{4})/g, '$1 ');
    return spacedSerialNumber;
  }

  // to display all cards
  useEffect(() => {
    console.log("User in UserContext: " + JSON.stringify(user));
    fetch("http://localhost:3010/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        // data is an array of objects
        setCards(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      });
  }, [id, user]);

  return (
    <div>
      <br />
      <div className="d-flex justify-content-center">
        <Button variant="outline-warning" onClick={handleShowEdit}>
          Edit a Card
        </Button>
      </div>
      <div>
        <br />
        <Container className="d-flex justify-content-center">
          <Row xs={"auto"} md={"auto"} className="g-4">
            {cards.map((card) => (
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Header className="d-flex justify-content-center">{card.card_type} card </Card.Header>
                  <br />
                  <Card.Title className="d-flex justify-content-center">{serialNumberSeparator(card.serial_number)}</Card.Title>
                  <Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        Expires {card.expiration_date}
                      </ListGroup.Item>
                      <ListGroup.Item>CVV {card.cvv}</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer className=" d-flex justify-content-center text-muted small">Card ID: {card.id}</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <div>
        <Modal
          show={showEditModal}
          onHide={handleCloseEdit}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Card
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditCard}>
              <Form.Group controlId="formCardId">
                <Form.Text>
                  Enter the Card ID (found at the bottom of each card) for which
                  you want to make edits:
                </Form.Text>
                <Form.Control
                  type="text"
                  name="cardId"
                  value={cardId}
                  onChange={handleInputChange}
                  placeholder="Card ID"
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formCardType">
                <Form.Label>Card Type</Form.Label>
                <Form.Select
                  name="cardType"
                  value={cardType}
                  onChange={handleInputChange}
                >
                  <option value="null">select</option>
                  <option value="debit">Debit</option>
                  <option value="credit">Credit</option>
                  {/* <option value="gift">Gift</option> */}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formSerialNumber">
                <Form.Label>Serial Number</Form.Label>
                <Form.Control
                  type="text"
                  name="serialNumber"
                  value={serialNumber}
                  onChange={handleInputChange}
                  placeholder="Serial Number"
                />
              </Form.Group>
              <Form.Group controlId="formCVV">
                <Form.Label>Card Verification Value (CVV)</Form.Label>
                <Form.Control
                  type="text"
                  name="cvv"
                  value={cvv}
                  onChange={handleInputChange}
                  placeholder="CVV"
                />
              </Form.Group>
              <Form.Group controlId="formExpirationDate">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                  type="text"
                  name="expirationDate"
                  value={expirationDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit">
                Confirm Updates
              </Button>
              &nbsp;&nbsp;
              <Button variant="danger" onClick={handleDeleteCard}>
                Delete Card
              </Button>
              <Form.Text>
                {isSerialNumberValid &&
                isCvvValid &&
                isExpirationDateValid &&
                isCardTypeValid &&
                isCardIdValid ? (
                  <p>All inputs are valid</p>
                ) : (
                  <p>
                    Invalid input(s) <br />
                    <br />
                    Please make sure to format: <br />- Card ID is a number and
                    is associated with a card in your wallet <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- If deleting a card, a
                    valid Card ID is all that is necessary
                    <br />- Card Type is selected (debit or credit) <br />-
                    Serial Number as a 16 digit number <br />- CVV as a 3 digit
                    number <br />- Date as a future date in the format mm/yy
                  </p>
                )}
              </Form.Text>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ViewCards;
