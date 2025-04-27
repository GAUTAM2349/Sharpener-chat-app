require("dotenv").config();
const { sequelize } = require("./config/database");
const express = require("express");

const app = express();



const cors = require("cors");
const { UserRouter, ChatRouter } = require("./routes");
const { logIncomingRequests } = require("./middlewares/requests");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logIncomingRequests);

const PORT = process.env.PORT;

const syncDB = async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log("Database synced");
    } catch (error) {
      console.error("Error syncing database: ", error);
    }
  };

syncDB();


app.use("/user", UserRouter)
app.use("/chat",ChatRouter);



app.listen(PORT, () => {
  console.log("Server started..");
});
