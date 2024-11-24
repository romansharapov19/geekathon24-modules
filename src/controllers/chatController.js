import { chatQuestion } from "../modules/chat/chat.js";

export const askAi = async (req, res) => {
	const response = await chatQuestion({ question: req.body.question });
	res.json({ message: response });
};
