const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const client = new OAuth2Client();
const apiRoutes = require("./routes/api");

const CLIENT_ID =process.env.AUTH_CLIENT_ID;
console.log(process.env.FRONT_END_URL);

const app = express();
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST"], // Allow only GET and POST methods
    // allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function verify(req, res, next) {
  try {
    // console.log(req);

    const token = req.headers["authorization"].split(" ")[1];

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    console.log({ payload });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

app.use("/api", verify, apiRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
