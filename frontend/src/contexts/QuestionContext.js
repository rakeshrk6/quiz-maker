import React, { createContext, useContext, useEffect, useState } from "react"
import useUserQuestions from "../hooks/fetchUserQuestions"

const QuestionContext = React.createContext()

export function useAuth() {
  return useContext(QuestionContext)
}

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const { fetchData } = useUserQuestions()

  const updateQuestions = async () => {
    const Questions = await fetchData()
    setQuestions(Questions)
  }

  useEffect(() => {
    updateQuestions()
  }, [])

  return (
    <QuestionContext.Provider value={{ questions }}>
      {children}
    </QuestionContext.Provider>
  )
}

export const useQuestions = () => React.useContext(QuestionContext)
