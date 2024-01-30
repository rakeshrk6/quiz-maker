const jwt = require("jsonwebtoken")
const { error } = require("../utils/responseWrapper")

module.exports = async (req, res, next) => {
  console.log("middleware called")
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("Authorization header is required")
    return res.send(error(401, "Authorization header is required"))
  }

  const accessToken = req.headers.authorization.split(" ")[1]

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    )
    // req._id = decoded._id
    next()
  } catch (e) {
    console.log(e)

    return res.send(error(401, "Invalid access key"))
  }
}
