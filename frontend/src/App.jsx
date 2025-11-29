import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CreateNotePage from './pages/CreateNotePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import { Toaster } from "react-hot-toast"


function App() {
  return (
    <div className="relative h-full w-full">
            <Toaster />
       <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#27C4FF_100%)]" />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreateNotePage />} />
        <Route path='/notes/:id' element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
