import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import CarList from './components/CarList'
import ConfirmModal from './components/ConfirmModal'
import CarForm from './components/CarForm'
import FullScreenCarForm from './components/FullScreenCarForm'
import Settings from './components/Settings'
import NotificationContainer from './components/NotificationContainer'
import { addCar, updateCar, deleteCar, restoreCar, getActiveCars, getDeletedCars, getCarsFromStorage, clearCarsStorage } from './data/cars'

function App() {
  const [activePage, setActivePage] = useState('cars')
  const [telegramUser, setTelegramUser] = useState(null)
  const [cars, setCars] = useState([])
  const [showCarForm, setShowCarForm] = useState(false)
  const [showFullScreenCarForm, setShowFullScreenCarForm] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [showDeleted, setShowDeleted] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [carToDelete, setCarToDelete] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formMode, setFormMode] = useState('add') // 'add' или 'edit'
  const notificationContainerRef = useRef(null)

  // Инициализация данных об автомобилях из localStorage
  useEffect(() => {
    try {
      const storedCars = getCarsFromStorage()
      setCars(storedCars)
    } catch (err) {
      console.error('Ошибка при загрузке данных об автомобилях:', err)
      setError('Не удалось загрузить данные об автомобилях')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp
      webApp.ready()
      
      // Получаем данные о пользователе
      // console.log('Telegram WebApp available');
      // console.log('initDataUnsafe:', webApp.initDataUnsafe);
      const user = webApp.initDataUnsafe.user || null
      // console.log('User data:', user);
      setTelegramUser(user)
      
      // Обновляем title страницы
      if (user) {
        document.title = `${user.first_name}`;
      } else {
        document.title = 'Админ панель';
      }
      
      // Настройка темы Telegram
      document.documentElement.style.setProperty('--tg-theme-bg-color', webApp.themeParams.bg_color || '#ffffff')
      document.documentElement.style.setProperty('--tg-theme-text-color', webApp.themeParams.text_color || '#000000')
      document.documentElement.style.setProperty('--tg-theme-hint-color', webApp.themeParams.hint_color || '#999999')
      document.documentElement.style.setProperty('--tg-theme-link-color', webApp.themeParams.link_color || '#229ed9')
      document.documentElement.style.setProperty('--tg-theme-button-color', webApp.themeParams.button_color || '#229ed9')
      document.documentElement.style.setProperty('--tg-theme-button-text-color', webApp.themeParams.button_text_color || '#ffffff')
      
      // Отключаем возможность закрытия приложения свайпом вниз
      webApp.disableVerticalSwipes()
    } else {
      // console.log('Telegram WebApp not available');
    }
  }, [])

  const showNotification = (message, type = 'info') => {
    if (notificationContainerRef.current) {
      notificationContainerRef.current.addNotification(message, type)
    }
  }

  const handleAddCar = (carData) => {
    try {
      const newCars = addCar(carData, cars)
      setCars(newCars)
      setShowCarForm(false)
      setShowFullScreenCarForm(false)
      showNotification('Автомобиль успешно добавлен!', 'success')
    } catch (err) {
      console.error('Ошибка при добавлении автомобиля:', err)
      showNotification('Не удалось добавить автомобиль. Попробуйте еще раз.', 'error')
    }
  }

  const handleUpdateCar = (id, carData) => {
    try {
      const newCars = updateCar(id, carData, cars)
      setCars(newCars)
      setShowCarForm(false)
      setShowFullScreenCarForm(false)
      setEditingCar(null)
      showNotification('Автомобиль успешно обновлен!', 'success')
    } catch (err) {
      console.error('Ошибка при обновлении автомобиля:', err)
      showNotification('Не удалось обновить автомобиль. Попробуйте еще раз.', 'error')
    }
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
      try {
        const newCars = deleteCar(carToDelete.id, cars)
        setCars(newCars)
        setCarToDelete(null)
        showNotification('Автомобиль успешно удален!', 'success')
      } catch (err) {
        console.error('Ошибка при удалении автомобиля:', err)
        showNotification('Не удалось удалить автомобиль. Попробуйте еще раз.', 'error')
      }
    }
  }

  const handleRestoreCar = (id) => {
    try {
      const newCars = restoreCar(id, cars)
      setCars(newCars)
      showNotification('Автомобиль успешно восстановлен!', 'success')
    } catch (err) {
      console.error('Ошибка при восстановлении автомобиля:', err)
      showNotification('Не удалось восстановить автомобиль. Попробуйте еще раз.', 'error')
    }
  }

  const handleEditCar = (car) => {
    setEditingCar(car)
    setFormMode('edit')
    setShowCarForm(true)
  }

  const handleSaveCar = (carData) => {
    if (formMode === 'add') {
      handleAddCar(carData)
    } else {
      handleUpdateCar(editingCar.id, carData)
    }
  }

  const handleCancelForm = () => {
    setShowCarForm(false)
    setShowFullScreenCarForm(false)
    setEditingCar(null)
    setFormMode('add')
  }

  const handleShowAddForm = () => {
    setFormMode('add')
    setShowCarForm(true)
  }

  const handleShowFullScreenAddForm = () => {
    setFormMode('add')
    setShowFullScreenCarForm(true)
  }

  const toggleDeletedView = () => {
    setShowDeleted(!showDeleted)
    setEditingCar(null) // Закрываем форму редактирования при переключении вида
  }

  const getDisplayedCars = () => {
    if (showDeleted) {
      return getDeletedCars(cars)
    } else {
      return getActiveCars(cars)
    }
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setCarToDelete(null)
  }

  const handleClearData = (data) => {
    // Проверяем, является ли вызов сохранением настроек или очисткой данных
    if (data && data.type === 'settings_saved') {
      showNotification('Настройки сохранены!', 'success')
      return
    }
    
    if (data && data.error) {
      showNotification(data.error, 'error')
      return
    }
    
    try {
      clearCarsStorage()
      setCars([])
      showNotification('Все данные очищены!', 'success')
    } catch (err) {
      console.error('Ошибка при очистке данных:', err)
      showNotification('Не удалось очистить данные. Попробуйте еще раз.', 'error')
    }
  }

  if (loading) {
    return (
      <div className="App">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.2rem'
        }}>
          Загрузка...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="App">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '3rem', marginBottom: '16px'}}>⚠️</div>
          <h2>Ошибка загрузки данных</h2>
          <p>{error}</p>
          <button 
            className="tg-button" 
            onClick={() => window.location.reload()}
            style={{marginTop: '20px'}}
          >
            Перезагрузить
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>{telegramUser ? `${telegramUser.first_name}` : 'Админ панель'}</h1>
        {telegramUser && (
          <div className="user-info">
            Привет, {telegramUser.first_name}!
          </div>
        )}
        {/* Отладочная информация */}
        <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
          {telegramUser ? `ID: ${telegramUser.id}` : 'Пользователь не определен'}
        </div>
      </header>
      
      <main className="app-content">
        {activePage === 'cars' && (
          <div className="page-content">
            <div className="page-header">
              <h2>{showDeleted ? 'Удаленные автомобили' : 'Автомобили'}</h2>
              <div className="header-actions">
                <button 
                  className="tg-button add-car-button"
                  onClick={handleShowAddForm}
                  style={{ display: showDeleted ? 'none' : 'block' }}
                >
                  + Добавить авто
                </button>
                <button 
                  className="tg-button add-car-button-fullscreen"
                  onClick={handleShowFullScreenAddForm}
                  style={{ display: showDeleted ? 'none' : 'block', marginLeft: '10px' }}
                >
                  + Добавить авто (полноэкранная форма)
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
        
        {activePage === 'settings' && (
          <Settings 
            telegramUser={telegramUser}
            onClearData={handleClearData}
          />
        )}
      </main>
      
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      
      {showCarForm && (
        <CarForm
          car={editingCar}
          onSubmit={(data) => {
            if (data && data.error) {
              showNotification(data.error, 'error')
            } else {
              handleSaveCar(data)
            }
          }}
          onCancel={handleCancelForm}
          cars={cars}
          mode={formMode}
        />
      )}
      
      {showFullScreenCarForm && (
        <FullScreenCarForm
          onSubmit={(data) => {
            handleAddCar(data)
          }}
          onCancel={handleCancelForm}
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
      
      <NotificationContainer ref={notificationContainerRef} />
    </div>
  )
}

export default App