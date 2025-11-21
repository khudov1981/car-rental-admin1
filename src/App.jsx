import React, { useState, useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import CarList from './components/CarList'
import ConfirmModal from './components/ConfirmModal'
import EditCarForm from './components/EditCarForm'
import { carsData, addCar, updateCar, deleteCar, restoreCar, getActiveCars, getDeletedCars } from './data/cars'

function App() {
  const [activePage, setActivePage] = useState('cars')
  const [telegramUser, setTelegramUser] = useState(null)
  const [cars, setCars] = useState(carsData)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [showDeleted, setShowDeleted] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [carToDelete, setCarToDelete] = useState(null)

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
    const car = cars.find(c => c.id === id)
    if (car) {
      setCarToDelete(car)
      setShowDeleteModal(true)
    }
  }

  const confirmDeleteCar = () => {
    if (carToDelete) {
      const deletedCar = deleteCar(carToDelete.id)
      if (deletedCar) {
        setCars(cars.map(car => car.id === carToDelete.id ? deletedCar : car))
      }
      setCarToDelete(null)
    }
  }

  const handleRestoreCar = (id) => {
    const restoredCar = restoreCar(id)
    if (restoredCar) {
      setCars(cars.map(car => car.id === id ? restoredCar : car))
    }
  }

  const handleEditCar = (car) => {
    setEditingCar(car)
  }

  const handleSaveEditCar = (updatedCar) => {
    handleUpdateCar(updatedCar.id, updatedCar)
  }

  const handleCancelEdit = () => {
    setEditingCar(null)
  }

  const toggleDeletedView = () => {
    setShowDeleted(!showDeleted)
    setEditingCar(null) // Закрываем форму редактирования при переключении вида
  }

  const getDisplayedCars = () => {
    if (showDeleted) {
      return getDeletedCars()
    } else {
      return getActiveCars()
    }
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setCarToDelete(null)
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
              <h2>{showDeleted ? 'Удаленные автомобили' : 'Автомобили'}</h2>
              <div className="header-actions">
                <button 
                  className="tg-button add-car-button"
                  onClick={() => setShowAddForm(true)}
                  style={{ display: showDeleted ? 'none' : 'block' }}
                >
                  + Добавить авто
                </button>
                <button 
                  className="tg-button toggle-deleted-button"
                  onClick={toggleDeletedView}
                >
                  {showDeleted ? '← Назад к авто' : '🗑️ Удаленные авто'}
                </button>
              </div>
            </div>
            
            <CarList 
              cars={getDisplayedCars()}
              onEdit={handleEditCar}
              onDelete={handleDeleteCar}
              onRestore={handleRestoreCar}
              showDeleted={showDeleted}
            />
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
      
      {editingCar && (
        <EditCarForm
          car={editingCar}
          onSave={handleSaveEditCar}
          onCancel={handleCancelEdit}
        />
      )}
      
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteCar}
        title="Удаление автомобиля"
        message={`Вы уверены, что хотите удалить ${carToDelete?.brand} ${carToDelete?.model}?`}
        confirmText="Удалить"
        cancelText="Отмена"
        confirmButtonClass="delete-button"
      />
    </div>
  )
}

export default App