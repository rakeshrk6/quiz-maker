const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { error, success } = require("../utils/responseWrapper")

const signupController = async (req, res) => {
  try {
    const { _id, email, password } = req.body

    if (!email || !password) {
      // return res.status(400).send("All fields are required")
      return res.send(error(400, "All fields are required"))
    }

    const oldUser = await User.findOne({ email })
    if (oldUser) {
      return res.send(error(409, "User is already registered"))
    }

    //we stored the password as hash. To convert to hash we use library bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.insertMany({
      _id,
      email,
      password: hashedPassword,
    })

    return res.send(success(201, `${user.email} is registered`))
  } catch (e) {
    console.log(e)
  }
}

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.send(error(400, "All fields are required"))
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.send(error(404, "User is not registered"))
    }

    const matched = await bcrypt.compare(password, user.password)
    if (!matched) {
      return res.send(error(403, "Incorrect password"))
    }

    const accessToken = generateAccessTokens({
      _id: user._id,
    })

    const refreshToken = generateRefreshTokens({
      _id: user._id,
    })

    res.cookie("jwt", refreshToken, {
      expires: new Date(Date.now() + 25892000000),
      // httpOnly: true,
      sameSite: "none",
      // secure: true,
    })

    return res.send(success(201, { accessToken }))
  } catch (e) {
    console.log(e)
  }
}

// this api will check the refresh token validity and generate a new access token
const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies

  if (!cookies.jwt) {
    return res.send(error(401, "Refresh token in cookie is required"))
  }

  const refreshToken = cookies.jwt
  console.log("refresh:", refreshToken)
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    )
    const _id = decoded._id
    const accessToken = generateAccessTokens({ _id })

    return res.send(success(201, { accessToken }))
  } catch (e) {
    console.log(e)

    return res.send(error(401, "Invalid refresh key"))
  }
}

const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    })
    return res.send(success(200, "user logged out"))
  } catch (e) {
    return res.send(error(500, e.message))
  }
}

//internal functions
const generateAccessTokens = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "20s",
    })
    console.log(token)
    return token
  } catch (e) {
    console.log(e)
  }
}

const generateRefreshTokens = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    })
    console.log(token)
    return token
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  signupController,
  loginController,
  refreshAccessTokenController,
  logoutController,
}
