import { invokeLLM } from "../../modules/baseAi/ai.js";

const SYSTEM_PROMPT = `You are a skilled financial assistant specializing in math and finance, dedicated to helping users manage their money effectively. Your role involves explaining complex financial concepts—like budgeting, saving, investing, loans, taxes, and retirement planning—in simple, easy-to-understand terms. You provide clear calculations, real-life examples, and step-by-step guidance to empower users to make informed decisions. Your approach is patient, empathetic, and thorough, ensuring users fully grasp the financial strategies you recommend.`;

let financeConversation = [];
export const initialFinanceQuestion = (userData) => {
	const prompt = `Hi my name is ${userData.name}, I'm lining in ${userData.location}. 
  Based on this information provide me the cost of living explicitly identifying the sectors(rent, communications, internet, mobile).`;

	return invokeLLM(financeConversation, prompt);
};

export const salaryAndMonthlyExpenses = ({
	salary,
	familyMembers,
	rent,
	electricity,
	gas,
	water,
	internet,
	communications,
}) => {
	const prompt = `Considering that my salary is ${salary}. 
  My family consist of ${familyMembers}, and I pay ${rent} for rent,
	${!!electricity ? `I pay ${electricity} for electricity` : ""},
	${!!gas ? `I pay ${gas} for gas` : ""},
	${!!water ? `I pay ${water} for water` : ""},
	${!!internet ? `I pay ${internet} for internet` : ""},
	${!!communications ? `I pay ${communications} for communications` : ""},

	based on this data can you calculate how much money will I have after paying all the expenses
  if you don't found any of the expenses on this prompt use the previous response data. Also include the cost of food based on recent data.
	Finish the response with a small table agglomerating all the numbers`;

	return invokeLLM(financeConversation, prompt);
};

export const investmentStrategy = ({ strategy }) => {
	const prompt = `After analyzing, my monthly expenses and taking in consideration the money 
	I have after the expenses could you give me the most recent financial advise on the next investing strategy: ${strategy}.
	In the end provide me 3 places where I can apply the strategy I chose.`;
	 

	return invokeLLM(financeConversation, prompt, SYSTEM_PROMPT);
};

export const justANameQuestion = () => {
	const prompt = `How much I pay for rent`;

	return invokeLLM(financeConversation, prompt);
};
