import express, { type Request, type Response } from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(cookieParser());
app.use(routes());

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.listen(4000, () => {
  console.log("listening on http://localhost:4000");
});
