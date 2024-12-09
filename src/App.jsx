import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <>
      <Header score={score} />
      <Main setScore={setScore} />
    </>
  )
}

