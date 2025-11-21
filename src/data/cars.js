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
    image: 'https://source.unsplash.com/300x200/?car,toyota'
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
    image: 'https://source.unsplash.com/300x200/?car,bmw'
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
    image: 'https://source.unsplash.com/300x200/?car,mercedes'
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