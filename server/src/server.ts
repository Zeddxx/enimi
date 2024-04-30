import express, { type Request, type Response } from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";
import path from "path";
import { dbConnection } from "./connections";
import { config } from "./cors/config";

const app = express();

dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors(config));

app.use(routes());

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.listen(4000, () => {
  console.log("listening on http://localhost:4000");
});
