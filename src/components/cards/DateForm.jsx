import React from "react";
import { Button, FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const DateForm = ({ handleCardSubmit, setStartDate, setEndDate,startDate,endDate }) => {
  return (
    <Form onSubmit={handleCardSubmit}>
      <FormGroup className="d-flex flex-column">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup className="d-flex flex-column">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </FormGroup>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => handleCardSubmit(e)}
        className="mt-4"
      >
        Generate Insights
      </Button>
    </Form>
  );
};

export default DateForm;
