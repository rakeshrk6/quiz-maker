import { createSlice } from "@reduxjs/toolkit"

export const QuestionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    answers: [],
  },
  reducers: {
    addQuestion: (state, action) => {
      const { questions, answers } = action.payload
      state.questions.push(questions)
      state.answers.push(answers)
    },

    deleteQuestions: (state, action) => {
      state.questions.length = 0
      state.answers.length = 0
    },

    deleteItem: (state, action) => {
      const index = action.payload
      state.questions.splice(index, 1)
    },
  },
})

export default QuestionSlice.reducer
export const { addQuestion, deleteQuestions, deleteItem } =
  QuestionSlice.actions
