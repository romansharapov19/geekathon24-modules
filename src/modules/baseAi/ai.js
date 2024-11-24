import {
	BedrockRuntimeClient,
	ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";
import "dotenv/config";

const MAX_INPUT_TOKENS = 3000;

const bedrockClient = new BedrockRuntimeClient({
	region: "us-west-2",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		sessionToken: process.env.AWS_SESSION_TOKEN,
	},
});

export const invokeLLM = async (
	conversationHistory,
	userInput,
	systemPrompt,
) => {
	const updateConversationHistory = (role, message) => {
		conversationHistory.push({ role, message });
	};

	const buildPrompt = () => {
		let prompt =
			conversationHistory
				.map((entry) => `${entry.role}: ${entry.message}`)
				.join("\n") + "\nAssistant:";

		const inputLength = prompt.length;
		if (inputLength > MAX_INPUT_TOKENS) {
			const truncatedHistory = conversationHistory.slice(-5); // Adjust the number of interactions if needed
			prompt =
				truncatedHistory
					.map((entry) => `${entry.role}: ${entry.message}`)
					.join("\n") + "\nAssistant:";
		}

		return prompt;
	};

	try {
		updateConversationHistory("system", systemPrompt);

		updateConversationHistory("User", userInput);

		const prompt = buildPrompt();

		const conversation = [
			{
				role: "user",
				content: [{ text: prompt }],
			},
		];

		const modelId = "meta.llama3-1-8b-instruct-v1:0";

		const command = new ConverseCommand({
			modelId,
			messages: conversation,
			inferenceConfig: { maxTokens: 2048, temperature: 0.2, topP: 0.9 },
		});

		const response = await bedrockClient.send(command);

		const responseText = response.output.message.content[0].text;

		updateConversationHistory("Assistant", responseText);

		return responseText;
	} catch (error) {
		console.error("Error: ", error);
	}
};
