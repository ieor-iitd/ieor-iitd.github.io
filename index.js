// const express = require('express');
// const path=require('path');
// const app = express();


// app.get('/', function(req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

// app.listen(3000, function() {
//   console.log("server started on port 3000");
// });
// const express = require('express');
// const path = require('path');
// const app = express();

// const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the index.html file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname,  'index.html'));
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile("ieor.html",{root:__dirname})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})