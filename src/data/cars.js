// Временные данные для демонстрации
export const carsData = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    color: 'Белый',
    plate: 'A123BC',
    status: 'available',
    pricePerDay: 2500,
    image: './src/assets/images/car1.jpg'
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
    image: './src/assets/images/car2.jpg'
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
    image: './src/assets/images/car3.jpg'
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
    image: './src/assets/images/car4.jpg'
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
    image: './src/assets/images/car5.jpg'
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
    image: './src/assets/images/car6.jpg'
  }
]

export const addCar = (car) => {
  const newCar = {
    ...car,
    id: Date.now(),
    status: 'available'
  }
  carsData.push(newCar)
  return newCar
}

export const updateCar = (id, updatedCar) => {
  const index = carsData.findIndex(car => car.id === id)
  if (index !== -1) {
    carsData[index] = { ...carsData[index], ...updatedCar }
    return carsData[index]
  }
  return null
}

export const deleteCar = (id) => {
  const index = carsData.findIndex(car => car.id === id)
  if (index !== -1) {
    return carsData.splice(index, 1)[0]
  }
  return null
}