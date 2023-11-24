import express from "express";
import cors from "cors";
const app = express();

// parse application/json
app.use(express.json());
// allow cors
app.use(cors());

// routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
