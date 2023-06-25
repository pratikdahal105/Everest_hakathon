import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

const LendBorrowPage = () => {
  const [redirectTo, setRedirectTo] = useState(null);

  const handleSubmit = (option) => {
    if (option === "lending") {
      setRedirectTo("http://localhost:3000/dashboard");
    } else if (option === "borrowing") {
      setRedirectTo("http://localhost:3000/borrower");
    }
  };

  if (redirectTo) {
    window.location.href = redirectTo; // Redirect to the target page
  }

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <Card.Title>Choose an Option</Card.Title>
          <Card.Text>Select whether you want to lend or borrow.</Card.Text>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={() => handleSubmit("lending")}>
              Lend
            </Button>
            <Button variant="primary" onClick={() => handleSubmit("borrowing")}>
              Borrow
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LendBorrowPage;
