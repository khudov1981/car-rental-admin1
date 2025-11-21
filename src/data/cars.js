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
    transmission: 'automatic',
    image: 'https://images.unsplash.com/photo-1542362567-b20d4ce58b84?w=300&h=200&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1549399542-7e7f0c3c4b4c?w=300&h=200&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1534303699193-4e354c4c4d4a?w=300&h=200&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1568605162577-7b94d3dc1d1b?w=300&h=200&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1542362567-b20d4ce58b84?w=300&h=200&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=200&fit=crop'
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