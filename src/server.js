const http = require('http');
const aws = require('aws-sdk');
const { DefaultAzureCredential } = require('@azure/identity');
const { ComputeManagementClient } = require('@azure/arm-compute');
const { google } = require('googleapis');

// AWS configuration
aws.config.update({ region: 'us-west-2' });
const ec2 = new aws.EC2();

// Azure configuration
const azureClient = new ComputeManagementClient(new DefaultAzureCredential(), "<your-azure-subscription-id>");

// Google Cloud configuration
const gce = google.compute({
  version: 'v1',
  auth: "<your-google-cloud-auth-key>",
});

// Helper function to handle JSON responses
const respondJson = (res, status, data) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

// Main server logic
const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/allocate-resource') {
    let body = '';
    
    // Collect the request body data
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { provider, instanceType } = JSON.parse(body);

      try {
        if (provider === 'aws') {
          // AWS instance allocation
          const params = {
            InstanceType: instanceType,
            MaxCount: 1,
            MinCount: 1,
            ImageId: 'ami-0abcdef1234567890',  // Replace with a valid Image ID
          };
          const instance = await ec2.runInstances(params).promise();
          respondJson(res, 200, instance);
          
        } else if (provider === 'azure') {
          // Azure instance allocation
          const instance = await azureClient.virtualMachines.beginCreateOrUpdate(/* Azure VM parameters */);
          respondJson(res, 200, instance);
          
        } else if (provider === 'gcp') {
          // GCP instance allocation
          const instance = await gce.instances.insert({
            project: 'your-project-id',
            zone: 'us-central1-a',
            resource: {
              name: 'instance-name',
              machineType: `zones/us-central1-a/machineTypes/${instanceType}`,
            },
          });
          respondJson(res, 200, instance);
          
        } else {
          respondJson(res, 400, { error: "Unsupported cloud provider." });
        }
      } catch (error) {
        respondJson(res, 500, { error: error.message });
      }
    });
  } else {
    // Handle unsupported routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
