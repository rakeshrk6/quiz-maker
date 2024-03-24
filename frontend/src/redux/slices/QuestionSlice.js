import { createSlice } from "@reduxjs/toolkit"

export const QuestionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
  },
  reducers: {
    addQuestion: (state, action) => {
      const { questions } = action.payload
      state.questions = questions
      // state.answers.push(answers)
    },
  },
})

export default QuestionSlice.reducer
export const { addQuestion } = QuestionSlice.actions
