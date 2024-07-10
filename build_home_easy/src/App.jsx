import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Nav from './components/Nav'
import Test from './components/Test'

const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/test1' element={<Test/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
