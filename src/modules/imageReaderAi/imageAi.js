import {
	BedrockRuntimeClient,
	InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import axios from "axios";

export const sendImageUrlToBedrock = async (imageUrl, prompt) => {
	// Initialize the Bedrock Runtime client
	const bedrockClient = new BedrockRuntimeClient({
		region: "us-west-2",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		sessionToken: process.env.AWS_SESSION_TOKEN,
	},
	});

	try {
		// Step 1: Fetch the image from the URL
		const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

		// Convert image to Base64
		const base64Image = Buffer.from(response.data, "binary").toString("base64");

		// Step 2: Prepare the payload for the Bedrock model
		const payload = JSON.stringify({
			messages: [
				{
					role: "user",
					content: [
						{
							type: "image",
							source: {
								type: "base64",
								media_type: "image/jpeg", // Make sure the media type matches the image type
								data: base64Image,
							},
						},
						{
							type: "text",
							text: prompt,
						},
					],
				},
			],
			max_tokens: 1000,
			anthropic_version: "bedrock-2023-05-31",
		});

		const invokeModelCommand = new InvokeModelCommand({
			modelId: "anthropic.claude-3-haiku-20240307-v1:0",
			contentType: "application/json",
			accept: "application/json",
			body: payload,
		});

		const bedrockResponse = await bedrockClient.send(invokeModelCommand);

		const responseJson = JSON.parse(
			new TextDecoder("utf-8").decode(bedrockResponse.body),
		);

		return responseJson.content[0].text;
	} catch (error) {
		console.error("Error invoking Bedrock model:", error);
		throw error;
	}
};
