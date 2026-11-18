import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import { MongoClient } from "mongodb";

const app: Express = express();
const port = 5000;

// Client URL
const client = new MongoClient(process.env.DB_CREDENTIALS as string);

// Middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
