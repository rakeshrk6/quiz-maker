import React, { useRef, useState } from "react"
import TextField from "@mui/material/TextField"
import { Checkbox, FormControlLabel } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { addQuestion } from "../../redux/slices/QuestionSlice"

function AddQuestion() {
  const question = useRef(null)
  const option1 = useRef(null)
  const option2 = useRef(null)
  const option3 = useRef(null)
  const option4 = useRef(null)
  const dispatch = useDispatch()
  const [answer, setAnswer] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = {
      questions: {
        question: question.current.value,
        options: [
          option1.current.value,
          option2.current.value,
          option3.current.value,
          option4.current.value,
        ],
      },
      answers: answer,
    }
    dispatch(addQuestion(formData))
    question.current.value = ""
    option1.current.value = ""
    option2.current.value = ""
    option3.current.value = ""
    option4.current.value = ""
    setAnswer("")
  }

  const handleCheck = (event) => {
    setAnswer(event.target.value)
  }

  return (
    <div className=" bg-[#fffae5] pb-16">
      <div className=" text-center py-8 text-2xl font-semibold">
        Add Questions here
      </div>
      <div className="bg-slate-50 flex justify-center max-w-2xl rounded-md mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-5 m-12"
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
              className="bg-[#3b82f6] py-2 px-9 rounded-md text-white"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddQuestion
