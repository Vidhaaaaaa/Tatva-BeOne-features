// import { useState } from 'react'
import './App.css'
import NavBar from './components/home/navBar.tsx'
import Home_Main from './components/home/main_window.tsx'
import Footer from './components/home/footer.tsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Home_Main />
      <Footer />
    </>
  )
}

export default App