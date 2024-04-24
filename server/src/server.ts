import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./routes/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);

app.use(routes())

app.listen(4000, () => {
    console.log("listening on http://localhost:4000")
})