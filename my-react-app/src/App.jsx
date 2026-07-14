import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1>Bhai ka React App Termux Pe! 🚀</h1>
      <p style={{ fontSize: '18px' }}>Hum direct Termux se edit kar rahe hain bina kisi app ke. 😎</p>
      <button 
        onClick={() => setCount(count + 1)} 
        style={{ 
          padding: '12px 24px', 
          fontSize: '18px', 
          cursor: 'pointer', 
          borderRadius: '8px', 
          border: 'none', 
          backgroundColor: '#61dafb', 
          color: '#000', 
          fontWeight: 'bold' 
        }}
      >
        Count is: {count}
      </button>
    </div>
  )
}

export default App

