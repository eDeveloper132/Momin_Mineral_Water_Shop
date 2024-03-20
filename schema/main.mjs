import Mongoose from "mongoose";
const { Schema, model } = Mongoose;

const Data = new Schema({
  author: { type: String, required: false, default: "Muhammad Ilyas" },
  name: { type: String, required: true },
  content: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});
const DataModel = model("Data", Data);
export default DataModel;
