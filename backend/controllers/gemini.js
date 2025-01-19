const { GoogleGenerativeAI } = require("@google/generative-ai")

async function gemini(req, res) {
  const { topic, questionCount, level } = req.body

  const prompt = `Generate a quiz on topic ${topic} with ${questionCount} questions of ${level} level. Each question should have a question, multiple-choice options. In format of {quiz_name, questions, answers}. A separate answers array contains the correct option number numbered from 1 to 4. Give data in json format and don not give any explanation and don't write any extra text outside json data`

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const result = await model.generateContent(prompt)

    
  const responseText = result.response.text();
  const cleanedText = responseText.replace(/^[^{}]*|[^{}]*$/g, ""); 
  let quiz;
  try {
    quiz = JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error parsing JSON:", error.message);
    return res.status(400).json({
      success: false,
      message: "Failed to parse quiz JSON. The response might be invalid.",
    });
  }
    console.log(quiz)
    res.status(200).json(quiz);
}

module.exports = { gemini }
