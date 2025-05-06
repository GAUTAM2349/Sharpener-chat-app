require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const { sequelize } = require("./config/database");
const { UserRouter, ChatRouter, GroupRouter } = require("./routes");
const { logIncomingRequests } = require("./middlewares/requests");
const loggedinUsersOnly = require("./middlewares/loggedinUsersOnly");
const setupSocket = require("./socket");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logIncomingRequests);

// API Routes
app.use("/user", UserRouter);
app.use("/chat", loggedinUsersOnly, ChatRouter);
app.use("/group", loggedinUsersOnly, GroupRouter);

// Static file serving from 'public'
app.use(express.static(path.join(__dirname, "public")));

// Fallback to index.html for frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Sync DB
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced");
  } catch (error) {
    console.error("Error syncing database: ", error);
  }
};
syncDB();

// Initialize socket.io
setupSocket(io);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
