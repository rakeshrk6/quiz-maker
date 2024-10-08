const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config({ path: ".env" }) //this put the .env data into process
const router = require("./router/route")
const connect = require("./database/connection")
const authRouter = require("./router/authRouter")
const cookieParser = require("cookie-parser")
const requireUser = require("./middlewares/requireUser")
const bodyParser = require("body-parser")

const app = express()
const PORT = process.env.PORT

//app middlewares
app.use(morgan("tiny"))
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
)
app.set("trust proxy", 1)
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api", router) //apis
app.use("/get-quizes", router)
// app.use("/auth", authRouter)
// chatgpt api

// app.use("/chatgpt", router)  gpt free trial is expired
app.use("/gemini", router)

app.get("/", (req, res) => {
  try {
    res.json("get request")
  } catch (error) {
    res.json(error)
  }
})

// start server only when we have valid connection
connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log("server started at", PORT)
      })
    } catch (error) {
      console.log("cannot connect to server")
    }
  })
  .catch((error) => {
    console.log("invalid database connection", error)
  })
