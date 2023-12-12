const express = require("express");
const authRoutes = require("./routes/gameRoute");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.listen(3000, () => {
  console.log("the server is listening ...");
});
