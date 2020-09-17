var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// Create model
var model = new Schema({
  Question: { type: String, required: true },
  Answers: { type: Array, required: true },
});
let resultModel = mongoose.model("model", model, "Kyanon");
module.exports = resultModel;
