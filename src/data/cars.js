// Ключ для хранения данных об автомобилях в localStorage
const CARS_STORAGE_KEY = 'carRentalCars'

// Функция для получения автомобилей из localStorage или возврата временных данных
const getCarsFromStorage = () => {
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

// Если данных в localStorage нет, используем временные данные
if (initialCars.length === 0) {
  initialCars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Camry',
      year: 2020,
      color: 'Белый',
      plate: 'A123BC',
      status: 'available',
      pricePerDay: 2500,
      transmission: 'automatic',
      image: 'https://images.unsplash.com/photo-1542362567-b20d4ce58b84?w=300&h=200&fit=crop',
      deleted: false,
      deletedAt: null,
      insurance: 'ОСАГО123456789',
      casco: 'КАСКО987654321'
    },
    {
      id: 2,
      brand: 'BMW',
      model: 'X5',
      year: 2021,
      color: 'Черный',
      plate: 'B456CD',
      status: 'rented',
      pricePerDay: 4500,
      transmission: 'automatic',
      image: 'https://images.unsplash.com/photo-1549399542-7e7f0c3c4b4c?w=300&h=200&fit=crop',
      deleted: false,
      deletedAt: null,
      insurance: 'ОСАГО111111111',
      casco: 'КАСКО222222222'
    },
    {
      id: 3,
      brand: 'Mercedes',
      model: 'E-Class',
      year: 2019,
      color: 'Серый',
      plate: 'C789EF',
      status: 'available',
      pricePerDay: 3500,
      transmission: 'automatic',
      image: 'https://images.unsplash.com/photo-1534303699193-4e354c4c4d4a?w=300&h=200&fit=crop',
      deleted: false,
      deletedAt: null,
      insurance: 'ОСАГО333333333',
      casco: 'КАСКО444444444'
    },
    {
      id: 4,
      brand: 'Audi',
      model: 'A6',
      year: 2022,
      color: 'Синий',
      plate: 'D123GH',
      status: 'available',
      pricePerDay: 4000,
      transmission: 'automatic',
      image: 'https://images.unsplash.com/photo-1568605162577-7b94d3dc1d1b?w=300&h=200&fit=crop',
      deleted: false,
      deletedAt: null,
      insurance: 'ОСАГО444444444',
      casco: 'КАСКО555555555'
    },
    {
      id: 5,
      brand: 'Volkswagen',
      model: 'Passat',
      year: 2020,
      color: 'Черный',
      plate: 'E456IJ',
      status: 'maintenance',
      pricePerDay: 2000,
      transmission: 'manual',
      image: 'https://images.unsplash.com/photo-1542362567-b20d4ce58b84?w=300&h=200&fit=crop',
      deleted: false,
      deletedAt: null,
      insurance: 'ОСАГО555555555',
      casco: 'КАСКО666666666'
    },
    {
      id: 6,
      brand: 'Nissan',
      model: 'X-Trail',
      year: 2021,
      color: 'Красный',
      plate: 'F789KL',
      status: 'available',
      pricePerDay: 3000,
      transmission: 'automatic',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=200&fit=crop',
      deleted: false,
      deletedAt: null,
      insurance: 'ОСАГО666666666',
      casco: 'КАСКО777777777'
    }
  ]
  
  // Сохраняем временные данные в localStorage
  saveCarsToStorage(initialCars)
}

// Экспортируем данные автомобилей
export const carsData = initialCars

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