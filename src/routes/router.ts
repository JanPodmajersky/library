import { Router, Request, Response } from "express";
import { Document } from "mongoose";
import { mongoose } from "../db"; 

export class GenericRouter {

    private router: Router = Router();
    private genericObject: mongoose.Model<Document>;


    constructor(genericObject: mongoose.Model<Document>) {
    	this.genericObject = genericObject;
  	}

    getRouter(): Router {

    	this.router.get("/", async(req, res, next) => {
	     	const genericObjects = await this.genericObject.find({}).lean().populate('authors');
        	
        	if (!genericObjects ) return res.status(404).send("No Object found.");
	    	res.status(200).json(genericObjects);
	    });
    	
	    this.router.get("/:id", async(req, res, next) => {
	     	const genericObjects = await this.genericObject.findById(req.params.id).lean().populate('authors').exec();
	     	
	     	if (!genericObjects || genericObjects == "") return res.status(404).send("No Object found.");
	    	res.status(200).json(genericObjects);
	    });

	    this.router.post("/", async(req, res, next) => {
        	const genericObject = await this.genericObject.create(req.body);
        	
        	if (!genericObject ) return res.status(500).send("There was a problem creating the object.");
        	res.status(200).json(genericObject);
		});

		this.router.put("/:id", async(req, res, next) => {
	     	const genericObjects = await this.genericObject.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
	     	
	     	if (!genericObjects ) return res.status(500).send("There was a problem updating the object.");
        	res.status(200).json(genericObjects);
	    });

	    this.router.delete("/:id", async(req, res, next) => {
	     	const genericObjects = await this.genericObject.findByIdAndRemove(req.params.id).lean().exec();
			
			if (!genericObjects ) return res.status(500).send("There was a problem deleting the object.");
        	res.status(200).json(genericObjects);
	    });
		
        return this.router;
    }
}