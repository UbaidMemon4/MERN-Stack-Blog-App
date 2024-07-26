const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Connectdb = require("./config/db");

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoute");
const blogRoutes = require("./routes/blogRoute");

//mongodb comnnection
Connectdb();

//rest object
const app = express();

//middle wares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//Port
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>Server Running Sucessfully</h1>");
});
//listen
app.listen(8000, () => {
  console.log(`Server Running On Port ${port}`);
});
