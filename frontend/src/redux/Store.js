import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { QuestionSlice } from "./slices/QuestionSlice"
import { QuizSlice } from "./slices/QuizSlice"
import QuestionReducer from "./slices/QuestionReducer"
import ResultReducer from "./slices/ResultReducer"
import ShowInstruction from "./slices/ShowInstruction"

const rootReducers = combineReducers({
  questions: QuestionReducer,
  result: ResultReducer,
})

const Store = configureStore({
  reducer: {
    question: QuestionSlice.reducer,
    quiz: QuizSlice.reducer,
    rootreducer: rootReducers,
    instruction: ShowInstruction,
  },
})

export default Store
