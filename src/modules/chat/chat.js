import { invokeLLM } from "../../modules/baseAi/ai.js";

let chatConversation = [];
export const chatQuestion = ({question}) => {

	return invokeLLM(chatConversation, question);
};
