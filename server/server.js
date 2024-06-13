require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./configs/dbConnect");
const errorHandler = require("./middleware/errorHandler");
const notFoundHandler = require("./middleware/notFoundHandler");
const logger = require("./middleware/logger");
const authRoutes = require("./routes/authRoute");
const goalRoutes = require("./routes/goalsRoute");
const verificationRoutes = require("./routes/verificationRoute");
const resetPasswordRoutes = require('./routes/resetPasswordRoute')
const app = express();

// general middle wares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mongo connection
dbConnect();

// custom Middleware
app.use(logger);

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/verification", verificationRoutes);
app.use('/api/resetPassword',resetPasswordRoutes)
app.use("/api/v1/goals", goalRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

Port = process.env.PORT || 8080;
app.listen(Port, () => {
  console.log(`Server has connect successFully on port ${Port}`);
});
