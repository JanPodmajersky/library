import { Schema, Document } from "mongoose";

export interface IBookModel extends Document{} 

export var bookSchema: Schema = new Schema({
  	name: String,
	description: String,
	isbn: String,
	authors: [{ type: Schema.Types.ObjectId, ref: 'author'}]
});


