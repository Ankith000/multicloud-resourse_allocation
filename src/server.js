const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Endpoint to allocate resources
app.post('/allocate', (req, res) => {
  const { imageName, containerName, port } = req.body;

  // Command to run Docker
  const command = `docker run -d --name ${containerName} -p ${port}:80 ${imageName}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ message: 'Failed to start container', error: stderr });
    }

    console.log(`Container started: ${stdout}`);
    res.json({ message: 'Container started successfully', containerId: stdout.trim() });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
