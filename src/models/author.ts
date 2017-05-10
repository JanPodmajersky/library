import { Schema, Document } from "mongoose";

export interface IAuthorModel extends Document{} 

export var authorSchema: Schema = new Schema({
  name: String
});

