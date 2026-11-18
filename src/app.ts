import cors from "cors";
import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { MongoClient } from "mongodb";

const app: Express = express();
const port = 5000;

// Client URL
const client = new MongoClient(process.env.DB_CREDENTIALS as string);

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to MongoDB
export async function connectToMongoDB() {
	try {
		await client.connect();
		console.log("Connected to MongoDB");
		return client;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		throw error;
	}
}

const connectedClient = await connectToMongoDB();
const database = connectedClient.db("hireloopdb");
const usersCollection = database.collection("user");
const jobsCollection = database.collection("job");

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.get("/users", async (req: Request, res: Response) => {
	try {
		const users = await usersCollection.find().toArray();
		res.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
