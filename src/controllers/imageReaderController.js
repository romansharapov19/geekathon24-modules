import { sendImageUrlToBedrock } from "../modules/imageReaderAi/imageAi.js";

export const readImage = async (req, res) => {

	const text = req.body.text;
	const image = req.body.image;

  
	const response = await sendImageUrlToBedrock(image, text);

	// Respond with the file path and text
	res.status(200).json({
		message: response,
	});
};
