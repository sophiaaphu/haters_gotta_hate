import { useState } from 'react'
import Header from './components/header'
import Home from './components/home'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CommentDisplay from './components/commentDisplay';

function App() {
  return (
    <Container maxWidth={false}>
      <div className="App">
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path = '/' element = {<Home/>}/>
            <Route path = '/comments/:id' element = {<CommentDisplay/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  )
}

export default App
