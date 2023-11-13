import { createSlice } from "@reduxjs/toolkit"

export const ResultReducer = createSlice({
  name: "result",
  initialState: {
    userId: null,
    result: [],
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    pushResultAction: (state, action) => {
      state.result.push(action.payload)
    },
    updateResultAction: (state, action) => {
      const { trace, checked } = action.payload
      state.result.fill(checked, trace, trace + 1)
    },
    resetResult: (state, action) => {
      state.userId = null
      state.result.length = 0
    },
  },
})

export default ResultReducer.reducer
export const { setUserId, pushResultAction, updateResultAction, resetResult } =
  ResultReducer.actions
