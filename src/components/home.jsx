import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import BarChart from "./barChart";

function Home({ data }) {
  const [types, setTypes] = useState([]);
  const [typeToGet, setTypeToGet] = useState(undefined);
  const [chartData, setChartData] = useState({});

  const getTypes = () => {
    const myData = [...data];
    const myTypes = [];
    for (let type of myData) {
      if (!myTypes.includes(type.type)) {
        myTypes.push(type.type);
      }
    }
    setTypes(myTypes);
  };

  useEffect(() => {
    getTypes();
  }, [data]);

  const handleChange = (event) => {
    const valueToSend = event.target.value;
    setTypeToGet(valueToSend);
  };

  const getTermsForType = (typeId) => {
    const myTerms = {};
    const myData = [...data];
    for (let type of myData)
      if (type.type == typeId) {
        for (let term of type.terms) {
          if (!(term in myTerms)) myTerms[term] = 1;
          else myTerms[term] += 1;
        }
      }
    setChartData(myTerms);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getTermsForType(typeToGet);
  };

  return (
    <React.Fragment>
      <Form className="my-form" onSubmit={(event) => handleSubmit(event)}>
        <Form.Group className="mb-3" controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Select
            aria-label="Select type"
            defaultValue={0}
            onChange={(event) => handleChange(event)}
          >
            <option disabled value={0}>
              Select a type
            </option>
            {types.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!typeToGet}>
          Get terms
        </Button>
      </Form>
      <BarChart chartData={chartData} />
    </React.Fragment>
  );
}

export default Home;
