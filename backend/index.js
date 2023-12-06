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

const app = express()
const PORT = process.env.PORT

//app middlewares
app.use(morgan("tiny"))
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
)
app.use(express.json())
app.use(cookieParser())

connect()
//routes
app.use("/api", requireUser, router) //apis
app.use("/get-quizes", router)
app.use("/auth", authRouter)

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
    console.log("invalid database connection")
  })
