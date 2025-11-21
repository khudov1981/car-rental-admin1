import React, { useState, useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation'

function App() {
  const [activePage, setActivePage] = useState('cars')
  const [telegramUser, setTelegramUser] = useState(null)

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp
      setTelegramUser(webApp.initDataUnsafe.user || null)
      
      // Настройка темы Telegram
      document.documentElement.style.setProperty('--tg-theme-bg-color', webApp.themeParams.bg_color || '#ffffff')
      document.documentElement.style.setProperty('--tg-theme-text-color', webApp.themeParams.text_color || '#000000')
      document.documentElement.style.setProperty('--tg-theme-hint-color', webApp.themeParams.hint_color || '#999999')
      document.documentElement.style.setProperty('--tg-theme-link-color', webApp.themeParams.link_color || '#229ed9')
      document.documentElement.style.setProperty('--tg-theme-button-color', webApp.themeParams.button_color || '#229ed9')
      document.documentElement.style.setProperty('--tg-theme-button-text-color', webApp.themeParams.button_text_color || '#ffffff')
    }
  }, [])

  return (
    <div className="App">
      <header className="app-header">
        <h1>Car Rental Admin</h1>
        {telegramUser && (
          <div className="user-info">
            Привет, {telegramUser.first_name}!
          </div>
        )}
      </header>
      
      <main className="app-content">
        {activePage === 'cars' && (
          <div className="page-content">
            <h2>Автомобили</h2>
            <div className="content-placeholder">
              <p>Здесь будет список автомобилей</p>
              <button className="tg-button">Добавить автомобиль</button>
            </div>
          </div>
        )}
        
        {activePage === 'clients' && (
          <div className="page-content">
            <h2>Клиенты</h2>
            <div className="content-placeholder">
              <p>Здесь будет список клиентов</p>
              <button className="tg-button">Добавить клиента</button>
            </div>
          </div>
        )}
      </main>
      
      <Navigation activePage={activePage} setActivePage={setActivePage} />
    </div>
  )
}

export default App