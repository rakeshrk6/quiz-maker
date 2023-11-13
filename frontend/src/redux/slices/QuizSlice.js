import { createSlice } from "@reduxjs/toolkit"

export const QuizSlice = createSlice({
  name: "quiz",
  initialState: [],
  reducers: {
    addQuizCard: (state, action) => {
      const quizes = action.payload

      quizes.map((item, ind) => state.push({ id: item._id, name: item.name }))
    },
    deleteOnUnmount: (state, action) => {
      state.length = 0
    },
  },
})

export default QuizSlice.reducer
export const { addQuizCard, deleteOnUnmount } = QuizSlice.actions
