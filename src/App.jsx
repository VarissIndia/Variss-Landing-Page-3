import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { GoogleOAuthProvider } from "@react-oauth/google";
import './App.css'

function App() {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;


  return (
    <Router>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="inset-0 bg-gradient-to-br from-[#f9fbfb] to-[#bfd0ec]">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      </GoogleOAuthProvider>
    </Router>
  )
}

export default App