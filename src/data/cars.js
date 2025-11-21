// Ключ для хранения данных об автомобилях в localStorage
const CARS_STORAGE_KEY = 'carRentalCars'

// Функция для получения автомобилей из localStorage или возврата пустого массива
export const getCarsFromStorage = () => {
  try {
    const storedData = localStorage.getItem(CARS_STORAGE_KEY)
    if (storedData) {
      return JSON.parse(storedData)
    }
  } catch (error) {
    console.error('Ошибка при получении данных из localStorage:', error)
  }
  
  // Если данных в localStorage нет, возвращаем пустой массив
  return []
}

// Функция для сохранения автомобилей в localStorage
const saveCarsToStorage = (cars) => {
  try {
    localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(cars))
  } catch (error) {
    console.error('Ошибка при сохранении данных в localStorage:', error)
  }
}

// Инициализация данных при загрузке
let initialCars = getCarsFromStorage()

// Экспортируем данные автомобилей
export const carsData = initialCars

// Функция для проверки существования автомобиля с указанным госномером
export const checkCarExists = (plate, currentCars) => {
  return currentCars.some(c => c.plate === plate && !c.deleted)
}

export const addCar = (car, currentCars) => {
  const newCar = {
    ...car,
    id: Date.now(),
    status: 'available',
    deleted: false,
    deletedAt: null,
    // Для упрощенной формы добавления добавляем значения по умолчанию
    brand: car.brand || 'Не указано',
    model: car.model || 'Не указано',
    year: car.year || new Date().getFullYear(),
    color: car.color || 'Не указан',
    pricePerDay: car.pricePerDay || 0,
    transmission: car.transmission || 'automatic',
    image: car.photos && car.photos.length > 0 ? car.photos[0] : 'https://images.unsplash.com/photo-1542362567-b20d4ce58b84?w=300&h=200&fit=crop',
    insurance: car.insurance || '',
    casco: car.casco || '',
    photos: car.photos || []
  }
  // Возвращаем новый массив с новым автомобилем в начале
  const updatedCars = [newCar, ...currentCars]
  saveCarsToStorage(updatedCars)
  return updatedCars
}

export const updateCar = (id, updatedCar, currentCars) => {
  const updatedCars = currentCars.map(car => car.id === id ? { ...car, ...updatedCar } : car)
  saveCarsToStorage(updatedCars)
  return updatedCars
}

export const deleteCar = (id, currentCars) => {
  const updatedCars = currentCars.map(car => {
    if (car.id === id) {
      return { ...car, deleted: true, deletedAt: new Date().toISOString() }
    }
    return car
  })
  saveCarsToStorage(updatedCars)
  return updatedCars
}

export const restoreCar = (id, currentCars) => {
  const updatedCars = currentCars.map(car => {
    if (car.id === id) {
      return { ...car, deleted: false, deletedAt: null }
    }
    return car
  })
  saveCarsToStorage(updatedCars)
  return updatedCars
}

export const getDeletedCars = (currentCars) => {
  return currentCars.filter(car => car.deleted)
}

export const getActiveCars = (currentCars) => {
  return currentCars.filter(car => !car.deleted)
}