import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserId } from "../redux/slices/ResultReducer"
// import * as React from "react"
import Box from "@mui/material/Box"

import Modal from "@mui/material/Modal"

import { setOpen } from "../redux/slices/ShowInstruction"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  // border-radius: "10px",
  boxShadow: 24,
  py: 5,
}

function QuizInstructions() {
  const inputRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { open } = useSelector((state) => state.instruction)

  function startQuiz() {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value))

      navigate("/quiz")
      dispatch(setOpen(false))
    }
  }

  return (
    <div className="mt-[70px] ">
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={` ${open ? "backdrop-blur" : ""} `}
      >
        <Box
          className="rounded-lg sm:px-20 px-7 w-[85vw] sm:w-[50vw]"
          sx={style}
        >
          <div
            className=" text-red-400 text-2xl absolute right-2 top-1 cursor-pointer"
            onClick={() => dispatch(setOpen(false))}
          >
            <i className="uil uil-times-circle"></i>
          </div>
          <h2 className="mb-4 sm:text-xl text-center font-semibold">
            Quiz Instructions
          </h2>

          <div className="leading-7 py-7 sm:text-base text-xs ">
            <p>1. You will be asked 20 questions one after another.</p>
            <p>2. 10 points is awarded for the correct answer.</p>
            <p>
              3. Each questions has four options. You can choose any one option.
            </p>
            <p>4. You can review and change answers before the quiz finish.</p>
            <p>5. The result will be shown at the end of the quiz.</p>
          </div>

          <form onSubmit={startQuiz} className=" text-center sm:mt-7">
            <input
              className=" border-gray-500 border-2 rounded-md sm:text-sm text-xs sm:p-2 p-1"
              ref={inputRef}
              type="text"
              placeholder="Username"
            />

            <button className=" bg-green-600 rounded-md sm:p-2 p-1 px-2 sm:px-3 sm:text-sm text-xs text-white ml-2">
              Start Quiz
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default QuizInstructions
