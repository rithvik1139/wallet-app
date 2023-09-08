import React, { useContext, useState } from "react";
import UserContext from "../UserContext";
import { Card, Form, Button } from "react-bootstrap";

function NewCard() {
  const { user } = useContext(UserContext);
  const [serialNumber, setSerialNumber] = useState("");
  const [isSerialNumberValid, setIsSerialNumberValid] = useState(false);
  const [cvv, setCvv] = useState("");
  const [isCvvValid, setIsCvvValid] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");
  const [isExpirationDateValid, setIsExpirationDateValid] = useState(false);
  const [cardType, setCardType] = useState("");
  const [isCardTypeValid, setIsCardTypeValid] = useState(false);

  if (!user) {
    window.location.href = "../login";
    console.log(user);
  }

  const validateSerialNumber = (input) => {
    const sanitizedInput = input.replace(/\s|-/g, "");
    // const numericInput = Number(sanitizedInput);
    return /^\d{16}$/.test(sanitizedInput);
  };
  const validateCvv = (input) => {
    // const numberInput = Number(input);
    const sanitizedInput = input.replace(/\s|-/g, "");
    // const numericInput = Number(sanitizedInput);
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
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      isSerialNumberValid &&
      isCvvValid &&
      isExpirationDateValid &&
      isCardTypeValid
    ) {
      // Perform action on valid submission
      fetch("http://localhost:3010/cards/newCard", {
        method: "POST",
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
          const message = "Serial number already exists";
          if (message === data.message) {
            alert(
              "ERROR: This card already exists with a unique serial number. Please create a new card or go to home and edit an existing card."
            );
          } else {
            alert(
              "Card added to Wallet! Add another card or view all cards on the home page."
            );
          }
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error("Error:", error);
        });

      setSerialNumber("");
      setIsSerialNumberValid(false);
      setCvv("");
      setIsCvvValid(false);
      setExpirationDate("");
      setIsExpirationDateValid(false);
      setCardType("");
      setIsCardTypeValid(false);
    } else {
      // Handle invalid submission
      console.log("Invalid input");
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>New Card</Card.Title>
          <Card.Body>
            Enter card information here to enter into your wallet!
          </Card.Body>
          <Form onSubmit={handleSubmit}>
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
              Add to Wallet
            </Button>
          </Form>
          <br />
          {isSerialNumberValid &&
          isCvvValid &&
          isExpirationDateValid &&
          isCardTypeValid ? (
            <p>All inputs are valid</p>
          ) : (
            <p>
              Invalid input(s) <br />
              <br />
              Please make sure to format: <br />- Card Type is selected (debit
              or credit) <br />- Serial Number as a 16 digit number <br />- CVV
              as a 3 digit number <br />- Date as a future date in the format
              mm/yy
            </p>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default NewCard;
