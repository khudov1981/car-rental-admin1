import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Инициализация Telegram Web API
if (window.Telegram) {
  window.Telegram.WebApp.ready();
  // Убран expand() чтобы приложение не растягивалось на всю ширину экрана
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)