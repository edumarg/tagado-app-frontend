import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import http from "../services/httpServices";
import { toast } from "react-toastify";

function Types({ data, setData }) {
  const [typeToSave, setTypeToSave] = useState({ type: "", terms: [] });

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    let myTypeToSave = { ...typeToSave };
    if (id.toLowerCase() === "type") {
      myTypeToSave.type = Number(value);
      setTypeToSave(myTypeToSave);
    }
    if (id.toLowerCase() === "terms") {
      let myTerms = value.split(" ");
      myTypeToSave.terms = myTerms;
      setTypeToSave(myTypeToSave);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      http.post("/type/new", typeToSave);
      toast.success("Type save succeed...");
      const myData = [...data];
      myData.push(typeToSave);
      setData(myData);
    } catch (e) {
      toast.error("Could not save...");
    }
  };

  return (
    <div>
      <h1 className="my-title">Add new Type</h1>
      <Form className="my-form" onSubmit={(event) => handleSubmit(event)}>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            id="type"
            type="number"
            min="0"
            max="255"
            placeholder="Enter type"
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Terms</Form.Label>
          <Form.Control
            id="terms"
            type="input"
            placeholder="Enter terms separate by a space"
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Types;
