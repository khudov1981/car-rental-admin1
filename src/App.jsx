import React, { useState, useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import CarCard from './components/CarCard'
import { carsData, addCar, updateCar, deleteCar } from './data/cars'

function App() {
  const [activePage, setActivePage] = useState('cars')
  const [telegramUser, setTelegramUser] = useState(null)
  const [cars, setCars] = useState(carsData)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCar, setEditingCar] = useState(null)

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

  const handleAddCar = (carData) => {
    const newCar = addCar(carData)
    setCars([...cars, newCar])
    setShowAddForm(false)
  }

  const handleUpdateCar = (id, carData) => {
    const updatedCar = updateCar(id, carData)
    if (updatedCar) {
      setCars(cars.map(car => car.id === id ? updatedCar : car))
    }
    setEditingCar(null)
  }

  const handleDeleteCar = (id) => {
    deleteCar(id)
    setCars(cars.filter(car => car.id !== id))
  }

  const handleEditCar = (car) => {
    setEditingCar(car)
  }

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
            <div className="page-header">
              <h2>Автомобили</h2>
              <button 
                className="tg-button add-car-button"
                onClick={() => setShowAddForm(true)}
              >
                + Добавить авто
              </button>
            </div>
            
            <div className="cars-list">
              {cars.map(car => (
                <CarCard 
                  key={car.id}
                  car={car}
                  onEdit={handleEditCar}
                  onDelete={handleDeleteCar}
                />
              ))}
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