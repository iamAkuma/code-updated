// Import required modules
const express = require('express');
const app = express();
const MongoDB = require('./db')
MongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Create Express application


// Define routes
app.get('/', (req, res) => {
  res.send('SERVER RUNNING!🔥');
});

app.use(express.json())
app.use('/api', require("./Routes/createUser"))
app.use('/api', require("./Routes/displayData"))

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
