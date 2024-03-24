import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import QuizPage from "./pages/QuizPage"
import Home from "./pages/Home"
import DisplayQuiz from "./pages/DisplayQuiz"
import Result from "./components/result/Result"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import RequireUser from "./utils/RequireUser"
import OnlyIfNotLogged from "./utils/OnlyIfNotLogged"
import Navbar from "./components/header/Navbar"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./contexts/AuthContext"
import ForgetPassword from "./components/ForgetPassword"
import Profile from "./pages/profile/Profile"

function App() {
  return (
    <AuthProvider>
      <div className="scroll-smooth">
        <BrowserRouter>
          <Toaster />
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forget-password" element={<ForgetPassword />} />

            <Route element={<RequireUser />}>
              <Route path="/quiz" element={<DisplayQuiz />} />
              <Route path="/result" element={<Result />} />
              <Route path="/create-quiz" element={<QuizPage />} />
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/instructions" element={<QuizInstructions />} /> */}
            </Route>

            <Route element={<OnlyIfNotLogged />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

export default App
