import { Card, Button } from "react-bootstrap";

function Home() {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="d-flex justify-content-center">
        <Card style={{ width: "18rem" }}>
          <Card.Header className="d-flex justify-content-center">
            <Card.Title>Welcome to the Wallet App</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              We help you add your credit or debit cards in a virtual space for
              you to manage, effectively and conveniently!
            </Card.Text>
          </Card.Body>
          <Card.Body className="d-flex justify-content-center">
            <Button
              variant="primary"
              onClick={() => (window.location.href = "../register")}
            >
              Get Started
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              variant="success"
              onClick={() => (window.location.href = "../login")}
            >
              Login
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Home;
