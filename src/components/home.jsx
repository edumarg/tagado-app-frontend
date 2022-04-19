import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Home({ data }) {
  const [types, setTypes] = useState([]);

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

  console.log("myTypes", types);
  return (
    <div>
      <h1>Types</h1>
      <DropdownButton id="dropdown-basic-button" title="Select a type">
        {types.map((type) => (
          <Dropdown.Item key="type">{type}</Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
}

export default Home;
