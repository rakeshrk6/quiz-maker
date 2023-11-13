import { createSlice } from "@reduxjs/toolkit"

export const ShowInstruction = createSlice({
  name: "instruction",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload
    },
  },
})

export default ShowInstruction.reducer
export const { setOpen } = ShowInstruction.actions
