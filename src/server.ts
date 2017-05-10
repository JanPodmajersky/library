import * as bodyParser from "body-parser";
import * as express from "express";

import { authorSchema, IAuthorModel} from "./models/author";
import { bookSchema, IBookModel} from "./models/book";
import { mongoose } from "./db"; 

import { GenericRouter } from "./routes/router";

export class Server {

  public app: express.Application;
  private author: mongoose.Model<IAuthorModel>;
  private book: mongoose.Model<IBookModel>;
  
  public static run(): Server {
    return new Server();
  }
  
  constructor() {
    this.app = express();
    this.config();
    this.api();
  }

  public config() {
      this.author = mongoose.model<IAuthorModel>("author", authorSchema);
      this.book = mongoose.model<IBookModel>("book", bookSchema);

      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({
        extended: true
      }));

      this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
          err.status = 404;
          next(err);
      });
  }

  public api() {
    this.app.use("/authors", new GenericRouter(this.author).getRouter());
    this.app.use("/books", new GenericRouter(this.book).getRouter());
  }
}