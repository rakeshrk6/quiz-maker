import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA9kTAOXagASovukQdr6ZKFEkWSgongtFg",
  authDomain: "quizcraft-417020.firebaseapp.com",
  projectId: "quizcraft-417020",
  storageBucket: "quizcraft-417020.appspot.com",
  messagingSenderId: "428771183185",
  appId: "1:428771183185:web:e80464197c866564564670",
  measurementId: "G-5EQ72CJ5X4",
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
export { app, auth }
