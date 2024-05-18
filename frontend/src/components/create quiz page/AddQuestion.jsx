import React, { useEffect, useRef, useState } from "react"
import TextField from "@mui/material/TextField"
import { Box, Checkbox, FormControlLabel, Modal } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { addQuestion } from "../../redux/slices/QuestionSlice"
import toast from "react-hot-toast"
import axios from "axios"
import { useAuth } from "../../contexts/AuthContext"
import useUserQuestions from "../../hooks/fetchUserQuestions"
import Loading from "../Loading"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "background.paper",
  boxShadow: 24,
  py: 2,
}

function AddQuestion({ Open, close }) {
  const question = useRef("")
  const option1 = useRef("")
  const option2 = useRef("")
  const option3 = useRef("")
  const option4 = useRef("")
  const dispatch = useDispatch()
  const [answer, setAnswer] = useState("")
  const { currentUser } = useAuth()
  const { questions, fetchData } = useUserQuestions()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      setLoading(true)
      if (
        question.current.value === "" ||
        option1.current.value === "" ||
        option2.current.value === "" ||
        answer === ""
      ) {
        toast.error("Please provide all details", {
          style: {
            padding: "10px",
            background: "#333",
            color: "#fff",
          },
        })
        return
      }
      const formData = {
        question: {
          question: question.current.value,
          options: [
            option1.current.value,
            option2.current.value,
            option3.current.value,
            option4.current.value,
          ],
        },
        answer: answer,
      }

      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/question/${currentUser.uid}`,
        formData
      )

      console.log(res)
      // refresh updated questions
      await fetchData()

      close()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheck = (event) => {
    setAnswer(event.target.value)
  }

  return (
    <div className={`flex justify-center items-center bg-white z-50`}>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex justify-center rounded-lg sm:px-10 " sx={style}>
          <div
            className=" text-red-400 text-2xl absolute right-2 top-1 cursor-pointer"
            onClick={() => close()}
          >
            <i className="uil uil-times-circle"></i>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 sm:mx-12 mx-6 mt-10 mb-5 sm:w-[53vw] w-[80vw]"
          >
            <div className=" mr-[7.5rem]">
              <TextField
                inputRef={question}
                fullWidth
                multiline
                id="question"
                label="Enter Question"
                variant="outlined"
              />
            </div>
            <div className="flex items-center">
              <TextField
                inputRef={option1}
                fullWidth
                size="small"
                id="option1"
                label="Option-1"
                variant="outlined"
              />
              <div className=" ml-5">
                <FormControlLabel
                  control={<Checkbox onClick={handleCheck} value={1} />}
                  label="Correct"
                />
              </div>
            </div>
            <div className="flex items-center">
              <TextField
                inputRef={option2}
                fullWidth
                size="small"
                id="option2"
                label="Option-2"
                variant="outlined"
              />
              <div className=" ml-5">
                <FormControlLabel
                  control={<Checkbox onClick={handleCheck} value={2} />}
                  label="Correct"
                />
              </div>
            </div>
            <div className="flex items-center">
              <TextField
                inputRef={option3}
                fullWidth
                size="small"
                id="option3"
                label="Option-3"
                variant="outlined"
              />
              <div className=" ml-5">
                <FormControlLabel
                  control={<Checkbox onClick={handleCheck} value={3} />}
                  label="Correct"
                />
              </div>
            </div>
            <div className="flex items-center">
              <TextField
                inputRef={option4}
                fullWidth
                size="small"
                id="option4"
                label="Option-4"
                variant="outlined"
              />
              <div className=" ml-5">
                <FormControlLabel
                  control={<Checkbox onClick={handleCheck} value={4} />}
                  label="Correct"
                />
              </div>
            </div>

            <div className=" text-center mt-5">
              <button
                onSubmit={handleSubmit}
                className="bg-[#3b82f6] sm:py-2 py-1 sm:px-9 px-5 rounded-md text-white"
                type="submit"
              >
                {loading ? <Loading /> : "Add"}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default AddQuestion
