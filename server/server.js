require("dotenv").config({ debug: true });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/Auth");
const jobRoutes = require("./routes/Jobs");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  })
);
app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => app.listen(PORT, () => console.log(`run on port : ${PORT}`)))
  .catch((err) => console.log(err));
