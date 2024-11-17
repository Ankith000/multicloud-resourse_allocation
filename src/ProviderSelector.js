import React from 'react';

function ProviderSelector({ provider, setProvider }) {
  return (
    <div style={{ padding: "10px" }}>
      <label style={{ fontSize: "1.1em", fontWeight: "500" }}>Cloud Provider:
        <select
          style={{
            marginLeft: "10px",
            padding: "8px",
            fontSize: "1em",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        >
          <option value="">Select Provider</option>
          <option value="aws">AWS</option>
          <option value="azure">Azure</option>
          <option value="gcp">GCP</option>
        </select>
      </label>
    </div>
  );
}

export default ProviderSelector;
