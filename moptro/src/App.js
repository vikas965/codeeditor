import React from 'react'
import { Routes,Route } from 'react-router-dom'
// import Login from './Login.'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Dashboard from './Dashboard'
// import Profile from './Profile'
import Editor from './Editor';
import Submissions from './Submissions';
const App = () => {
  return (
    <div className='App'>
      <Routes>
        
        <Route path="/" element={<Editor/>} />
        <Route path="/submissions" element={<Submissions/>} />

      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
