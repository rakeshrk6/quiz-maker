import { Box, InputLabel, MenuItem, Modal, TextField } from "@mui/material"
import Select from "@mui/material/Select"
import React, { useRef, useState } from "react"
import { axiosClient } from "../../utils/axiosClient"
import axios from "axios"
import { useDispatch } from "react-redux"
import { startExamAction } from "../../redux/slices/QuestionReducer"
import { updateLength } from "../../redux/slices/ResultReducer"
import { useNavigate } from "react-router-dom"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "background.paper",
  boxShadow: 24,
  py: 2,
}

function CreatePage({ Open, close }) {
  const [level, setLevel] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [isGotOutput, setGotOutput] = useState(false)
  const topic_name = useRef("")
  const question_count = useRef("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (event) => {
    setLevel(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    const inputData = {
      topic: topic_name.current.value,
      questionCount: question_count.current.value,
      level: level,
    }

    ;(async () => {
      try {
        const output = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/gemini/ai`,
          inputData
        )
        const { quiz_name, questions, answers } = output.data

        if (questions.length > 0) {
          dispatch(startExamAction({ questions, answers }))
          dispatch(updateLength(questions.length))
        } else {
          throw new Error("No Question Available")
        }

        // console.log("output", quiz_name, questions, answers)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
        setGotOutput(true)
      }
    })()
  }
  function startQuiz() {
    close()
    navigate("/quiz")
  }
  return (
    <div className={`flex justify-center items-center bg-white z-50`}>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={` ${Open ? "backdrop-blur" : ""} `}
      >
        <Box className="flex justify-center rounded-lg sm:px-10" sx={style}>
          <div
            className=" text-red-400 text-2xl absolute right-2 top-1 cursor-pointer"
            onClick={() => close()}
          >
            <i className="uil uil-times-circle"></i>
          </div>
          {isLoading ? (
            <div>
              <img
                src="https://www.shutterstock.com/shutterstock/videos/1106089457/thumb/1.jpg?ip=x480"
                alt=""
              />
              <h1 className="m-5 mb-8 text-center text-xl font-medium">
                Please wait. Your Quiz is generating...
              </h1>
            </div>
          ) : isGotOutput ? (
            <div className="sm:w-[50vh] flex flex-col justify-center items-center py-20  ">
              <h1 className="text-3xl text-center font-medium pb-3">
                Hurray! Your Quiz Generated
              </h1>
              <div className=" text-green-700 text-5xl ">
                <i className="uis uis-check-circle"></i>
              </div>

              <button
                onClick={startQuiz}
                className=" bg-amber-400 rounded-md p-3 px-5  text-sm mx-auto text-white font-medium mt-10"
              >
                Start Quiz
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-5 m-12 sm:w-[50vh] w-[53vw]">
              <TextField
                inputRef={topic_name}
                fullWidth
                id="topic_name"
                label="Topic Name"
                variant="outlined"
              />
              <TextField
                inputRef={question_count}
                fullWidth
                id="question_count"
                label="No. of Questions"
                variant="outlined"
              />
              <InputLabel className="text-black -mb-3">Select Level</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Level"
                value={level}
                onChange={handleChange}
              >
                <MenuItem value={"easy"}>Easy</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"hard"}>Hard</MenuItem>
              </Select>

              <button
                onClick={handleSubmit}
                className=" bg-green-600 rounded-md sm:p-3 p-2 sm:px-3  sm:text-md mx-auto text-white w-40 mt-10"
              >
                Create Quiz
              </button>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  )
}

export default CreatePage
