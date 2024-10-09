// Plan B
const express = require("express");
const app = express();
const port = 8080;

// Ini buat load file public e
app.use(express.static("../public"));

app.get("/", (req, res) => {
  res.redirect("dashboard.html");
});

app.listen(port, () => {
  console.log(`Web is running on port ${port}`);
});
