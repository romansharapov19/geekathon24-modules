import express from "express";
import {
	financeFirst,
	financeSecond,
	financeInvestment,
	helloWorld,
} from "./controllers/myController.js";
import { askAi } from "./controllers/chatController.js";
import { readImage } from "./controllers/imageReaderController.js";

const app = express();

// Middleware (optional)
app.use(express.json());

// Log where the server is running (for local development)
if (process.env.NODE_ENV !== "production") {
	console.log("Server is running in development mode on http://localhost:3000");
	// Start the Express server locally
	app.listen(3000, () => {
		console.log("Server is listening on port 3000");
	});
} else {
	console.log("Server is running in production mode on AWS Lambda.");
}

// Define routes
app.post("/api/chat", askAi);
app.get("/api/hello", helloWorld);
app.post("/api/financeFirst", financeFirst);
app.post("/api/financeSecond", financeSecond);
app.post("/api/financeInvest", financeInvestment);

// POST endpoint to handle image and text upload
app.post("/api/imageReader", readImage);

export default app;
