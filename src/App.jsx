// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/_Home'
import CheckoutPage from './Pages/CheckOutpages'
function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/home" element={<Home />} />

    </Routes>
  )
}

export default App
