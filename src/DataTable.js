import React from "react";

const DataTable = ({ fields, data }) => {
  if (!fields.length || !data.length) {
    return <p>No data available to display.</p>;
  }

  return (
    <table border="1" style={{ width: "100%", marginTop: "20px" }}>
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field.name}>{field.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {fields.map((field) => (
              <td key={field.name}>{row[field.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
