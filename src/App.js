import React, { useState } from 'react';
import ProviderSelector from './ProviderSelector';
import InstanceForm from './InstanceForm';
import './App.css';

function App() {
  const [provider, setProvider] = useState('');
  const [instanceType, setInstanceType] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(`Instance type "${instanceType}" has been initiated on ${provider.toUpperCase()}.`);
  };

  return (
    <div className="App">
      <h1>Multi-Cloud Resource Allocation</h1>
      <form onSubmit={handleSubmit}>
        <ProviderSelector provider={provider} setProvider={setProvider} />
        <InstanceForm instanceType={instanceType} setInstanceType={setInstanceType} />
        <button type="submit">Allocate Resource</button>
      </form>
      {response && <pre>{response}</pre>}
    </div>
  );
}

export default App;
