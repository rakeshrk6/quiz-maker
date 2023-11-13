import { createSlice } from "@reduxjs/toolkit"

export const QuestionReducer = createSlice({
  name: "questions",
  initialState: {
    queue: [],
    answers: [],
    trace: 0,
  },
  reducers: {
    startExamAction: (state, action) => {
      let { questions, answers } = action.payload
      return {
        ...state,
        queue: questions,
        answers,
      }
    },
    moveNextAction: (state, action) => {
      return {
        ...state,
        trace: state.trace + 1,
      }
    },
    reset: (state, action) => {
      return {
        queue: [],
        answers: [],
        trace: 0,
      }
    },
  },
})

export default QuestionReducer.reducer
export const { startExamAction, moveNextAction, reset } =
  QuestionReducer.actions
