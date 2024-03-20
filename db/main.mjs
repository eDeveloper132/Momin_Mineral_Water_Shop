import mongoose from "mongoose";
import chalk from "chalk";
import { URI } from "../utils/config.mjs";

const connection = () => {
  const db = mongoose.connect(URI);
  mongoose.connection.on("connected", () => {
    console.log(chalk.yellow("Mongoose is Connected"));
  });
  mongoose.connection.on("disconnected", () => {
    console.log(chalk.magenta("Mongoose is Disconnected"));
    process.exit(1);
  });
  mongoose.connection.on("error", (err) => {
    console.log(chalk.red("Mongoose Connection Error ", err));
    process.exit(1);
  });
  process.on("SIGINT", () => {
    console.log(chalk.blue("App is Terminating"));
    mongoose.connection.close(() => {
      console.log(chalk.blue("Mongoose Default Connection Closed"));
      process.exit(0);
    });
  });
  return db;
};
export default connection;
