import { createSlice } from "@reduxjs/toolkit"

export const ResultReducer = createSlice({
  name: "result",
  initialState: {
    userId: null,
    score: 0,
    optionsSelected: [],
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
    },

    updateResultAction: (state, action) => {
      const { trace, selectedOption } = action.payload
      state.optionsSelected[trace] = selectedOption
    },
    addScore: (state, action) => {
      state.score += action.payload
    },
    resetResult: (state, action) => {
      state.userId = null
      state.score = 0
      state.optionsSelected.length = 0
    },
    updateLength: (state, action) => {
      state.optionsSelected.length = action.payload
      state.optionsSelected.fill(undefined)
    },
  },
})

export default ResultReducer.reducer
export const {
  setUserId,
  pushResultAction,
  updateResultAction,
  addScore,
  resetResult,
  updateLength,
} = ResultReducer.actions
