// const OpenAI = require("openai")

// const openai = new OpenAI({ apiKey: process.env.API_KEY })

// async function chatgpt(req, res) {
//   const { topic, questionCount, level } = req.body
//   const input = `Generate a ${topic} quiz with ${questionCount} questions of ${level} level. Each question should have a question, multiple-choice options. In format of {quiz_name, questions, answers}. A separate answers array contains the correct option number numbered from 1 to 4. Give only json data not any explanation`

//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: `${input}` }],
//     model: "gpt-3.5-turbo",
//   })

//   const formattedJsonString = JSON.stringify(
//     JSON.parse(completion.choices[0].message.content),
//     null,
//     2
//   )
//   console.log(formattedJsonString)
//   res.send(formattedJsonString)
// }

// module.exports = { chatgpt }
