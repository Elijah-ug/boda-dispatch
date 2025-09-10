import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const defaultRoute = "/api/bodablocks/";

app.use(`${defaultRoute}`, router);
app.use(`${defaultRoute}trips`, router);
// app.use(`${defaultRoute}riders`, async (req, res) => {
//   res.json({ msg: "Routes clearly" });
// });

app.listen(port, () => {
  console.log(`http://localhost:${port + defaultRoute} Listening to port ${port}`);
});
