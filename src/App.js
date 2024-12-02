import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "./DataTable";

const App = () => {
  const [selectedOption, setSelectedOption] = useState("userInfo");
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch schema and data when dropdown selection changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch schema
        const schemaResponse = await axios.get(`/api/${selectedOption}/schema`);
        // Fetch data
        const dataResponse = await axios.get(`/api/${selectedOption}/data`);
        setFields(schemaResponse.data.fields);
        setData(dataResponse.data);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOption]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dynamic Data Table</h1>
      <label htmlFor="dataType">Select Data Type:</label>
      <select id="dataType" onChange={handleOptionChange}>
        <option value="userInfo">User Info</option>
        <option value="addressInfo">Address Info</option>
        <option value="paymentInfo">Payment Info</option>
      </select>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && <DataTable fields={fields} data={data} />}
    </div>
  );
};

export default App;
