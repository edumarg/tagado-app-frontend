import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import BarChart from "./barChart";
import http from "../services/httpServices";

function Home({ data }) {
  const [types, setTypes] = useState([]);
  const [typeToGet, setTypeToGet] = useState(undefined);
  const [chartData, setChartData] = useState({});
  const [loadingChart, setLoadingChart] = useState(false);

  const getTypes = () => {
    const myData = [...data];
    const myTypes = [];
    for (let type of myData) {
      if (!myTypes.includes(String(type.type))) {
        myTypes.push(String(type.type));
      }
    }
    myTypes.sort((a, b) => a - b);
    setTypes(myTypes);
  };

  useEffect(() => {
    getTypes();
  }, [data]);

  const handleChange = (event) => {
    const valueToSend = event.target.value;
    setTypeToGet(valueToSend);
  };

  const getTermsForType = async (typeId) => {
    setLoadingChart(true);
    try {
      const response = await http.get(`/type/${Number(typeId)}`);
      const data = await response.data;
      console.log("Data", data);
      setChartData(data);
    } catch (exception) {
      if (exception.response)
        toast.error("There was an issue getting the information");
    }
    setLoadingChart(false);
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
        <Button variant="primary" type="submit" disabled={!data || !typeToGet}>
          Get terms
        </Button>
      </Form>
      {loadingChart ? (
        <div className="my-spinner-div">
          <Spinner animation="border" variant="warning">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <BarChart chartData={chartData} />
      )}
    </React.Fragment>
  );
}

export default Home;
