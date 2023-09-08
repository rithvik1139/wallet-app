import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { Card, Button } from "react-bootstrap";
import { useContext } from "react";

function EditCard() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleReturnHome = () => {
    navigate("../viewCards");
  };
  if (!user) {
    window.location.href = "../login";
    console.log(user);
  }

  return (
    <div>
      <div>
        <br />
        <br />
        <br />
      </div>

      <div className="d-flex justify-content-center">
        <Card style={{ width: "18rem", textAlign: "center" }}>
          <br />
          <Card.Title>Success!</Card.Title>
          <Card.Text>Card has been modified/deleted.</Card.Text>
          <Card.Body>
            <Button variant="secondary" onClick={handleReturnHome}>
              Return Home
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default EditCard;
