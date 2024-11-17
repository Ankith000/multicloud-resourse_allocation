import React from 'react';

function InstanceForm({ instanceType, setInstanceType }) {
  return (
    <div style={{ padding: "10px" }}>
      <label style={{ fontSize: "1.1em", fontWeight: "500" }}>Instance Type:
        <input
          style={{
            marginLeft: "10px",
            padding: "8px",
            fontSize: "1em",
            borderRadius: "4px",
            border: "1px solid #ddd",
            width: "100%",
            marginTop: "5px"
          }}
          type="text"
          value={instanceType}
          onChange={(e) => setInstanceType(e.target.value)}
          placeholder="e.g., t2.micro, Standard_B1s, n1-standard-1"
        />
      </label>
    </div>
  );
}

export default InstanceForm;
