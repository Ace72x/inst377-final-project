const express = require("express");
const cors = require("cors");
const path = require("path");
const apiRoutes = require("./routes/api");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); 

app.use("/api", apiRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
