import express from "express";
import "dotenv/config";
import cors from "cors";
import chalk from "chalk";
import { fileURLToPath } from "url";
import path from "path";
import connection from "./db/main.mjs";
import postroute from "./routes/post.mjs";

connection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8767;
app.use(express.json());
app.use(cors());

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
app.use("*",(req,res,next)=>
{
    console.log(chalk.blueBright("EveryThing is Okay"));
    next();
})
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.use("/posts", postroute);

app.use("*", (req, res) => {
  res.status(404).send({
    message: "404 You are in the wrong place on our site",
  });
});

app.listen(PORT, () => {
  console.log(`${chalk.magenta("Server is running on " + PORT)}`);
});
