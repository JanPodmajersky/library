import * as mongoose from "mongoose";

mongoose.connect('mongodb://localhost/library');

export {mongoose};