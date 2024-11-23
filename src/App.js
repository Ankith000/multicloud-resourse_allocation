import React, { useState, useEffect } from 'react';
import ProviderSelector from './ProviderSelector';
import InstanceForm from './InstanceForm';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './App.css';

function App() {
  const [provider, setProvider] = useState('');
  const [instanceType, setInstanceType] = useState('');
  const [response, setResponse] = useState(null);
  const [resourceUsage, setResourceUsage] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      imageName: "my-react-app",
      containerName: `instance-${Date.now()}`,
      port: 3000,
    };
  
    try {
      const response = await fetch('http://localhost:5000/allocate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      setResponse(data.message);
    } catch (error) {
      console.error('Error allocating resource:', error);
      setResponse('Failed to allocate resource. Check the server logs.');
    }
  };
  
  useEffect(() => {
    // Mock real-time performance data
    const interval = setInterval(() => {
      const newUsage = {
        time: new Date().toLocaleTimeString(),
        cpu: Math.random() * 100, // Mock CPU usage in percentage
        memory: Math.random() * 100, // Mock Memory usage in percentage
      };

      setResourceUsage((prev) => [...prev.slice(-9), newUsage]); // Keep the last 10 records

      // Check for anomalies
      if (newUsage.cpu > 80 || newUsage.memory > 80) {
        setAlerts((prev) => [...prev, `High usage detected at ${newUsage.time}`]);
        console.warn(`Alert: High resource usage! CPU: ${newUsage.cpu}%, Memory: ${newUsage.memory}%`);
      }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Multi-Cloud Resource Allocation</h1>
      <form onSubmit={handleSubmit}>
        <ProviderSelector provider={provider} setProvider={setProvider} />
        <InstanceForm instanceType={instanceType} setInstanceType={setInstanceType} />
        <button type="submit">Allocate Resource</button>
      </form>
      {response && <pre>{response}</pre>}

      {/* Visualization */}
      <h2>Performance Monitoring</h2>
      <LineChart width={600} height={300} data={resourceUsage}>
        <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU Usage" />
        <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory Usage" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
      </LineChart>

      {/* Alerts */}
      <h3>Alerts</h3>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
