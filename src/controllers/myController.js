import {
	initialFinanceQuestion,
	salaryAndMonthlyExpenses,
	justANameQuestion,
	investmentStrategy,
} from "../modules/finance/finance.js";

export const helloWorld = async (req, res) => {
	
	res.json({ message: 'response' });
};

export const financeFirst = async (req, res) => {
	const aiResponse = await initialFinanceQuestion({
		name: req.body.name,
		location: req.body.location,
	});

	res.json({ message: aiResponse });
};

export const financeSecond = async (req, res) => {
	const aiResponse = await salaryAndMonthlyExpenses({
		salary: req.body.salary,
		familyMembers: req.body.familyMembers,
		rent: req.body.rent,
		electricity: req.body.electricity,
		gas: req.body.gas,
		water: req.body.water,
		internet: req.body.internet,
		communications: req.body.communications,
	});

	res.json({ message: aiResponse });
};

export const financeInvestment = async (req, res) => {
	const aiResponse = await investmentStrategy({
		strategy: req.body.strategy,
	});

	res.json({ message: aiResponse });
};
