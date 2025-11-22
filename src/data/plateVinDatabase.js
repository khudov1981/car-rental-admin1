// База данных, связывающая госномера с VIN
export const plateVinDatabase = [
  {
    plate: 'A123BC777',
    vin: '1HGBH41JXMN109186'
  },
  {
    plate: 'B456CD888',
    vin: '2T1BURHE5JC023456'
  },
  {
    plate: 'C789EF999',
    vin: 'WBAVA335X8NL64045'
  },
  {
    plate: 'D123GH111',
    vin: 'WAUZZZ8K9A1012345'
  },
  {
    plate: 'E456IJ222',
    vin: 'JH4NA21691T000123'
  }
]

// Расширенная информация об автомобилях по VIN
export const vinCarDatabase = [
  {
    vin: '1HGBH41JXMN109186',
    brand: 'Toyota',
    model: 'Camry',
    color: 'Белый',
    year: 2020,
    transmission: 'automatic'
  },
  {
    vin: '2T1BURHE5JC023456',
    brand: 'BMW',
    model: 'X5',
    color: 'Черный',
    year: 2021,
    transmission: 'automatic'
  },
  {
    vin: 'WBAVA335X8NL64045',
    brand: 'Mercedes',
    model: 'E-Class',
    color: 'Серый',
    year: 2019,
    transmission: 'automatic'
  },
  {
    vin: 'WAUZZZ8K9A1012345',
    brand: 'Audi',
    model: 'A6',
    color: 'Синий',
    year: 2022,
    transmission: 'automatic'
  },
  {
    vin: 'JH4NA21691T000123',
    brand: 'Volkswagen',
    model: 'Passat',
    color: 'Черный',
    year: 2020,
    transmission: 'manual'
  }
]

// Функция для добавления новой связки "госномер - VIN - авто"
export const addPlateVinCar = (plate, vin, carInfo) => {
  // Проверка на существование обязательных параметров
  if (!plate || !vin || !carInfo) {
    console.error('addPlateVinCar: отсутствуют обязательные параметры')
    return false
  }
  
  // Проверка на строковый тип параметров
  if (typeof plate !== 'string' || typeof vin !== 'string') {
    console.error('addPlateVinCar: plate и vin должны быть строками')
    return false
  }
  
  // Проверка на объектный тип carInfo
  if (typeof carInfo !== 'object' || carInfo === null) {
    console.error('addPlateVinCar: carInfo должен быть объектом')
    return false
  }
  
  // Добавляем связку госномер - VIN
  plateVinDatabase.push({ plate: plate.toUpperCase(), vin })
  
  // Добавляем информацию об автомобиле
  vinCarDatabase.push({ vin, ...carInfo })
  
  console.log(`Добавлена новая связка: ${plate} -> ${vin} -> ${JSON.stringify(carInfo)}`)
  return true
}

// Функция для получения VIN по госномеру
export const getVinByPlate = (plate) => {
  // Проверка на существование параметра
  if (!plate) {
    console.warn('getVinByPlate: отсутствует параметр plate')
    return null
  }
  
  // Проверка на строковый тип
  if (typeof plate !== 'string') {
    console.warn('getVinByPlate: plate должен быть строкой')
    return null
  }
  
  const record = plateVinDatabase.find(item => item.plate === plate.toUpperCase())
  return record ? record.vin : null
}

// Функция для получения информации об автомобиле по VIN
export const getCarInfoByVin = (vin) => {
  // Проверка на существование параметра
  if (!vin) {
    console.warn('getCarInfoByVin: отсутствует параметр vin')
    return null
  }
  
  // Проверка на строковый тип
  if (typeof vin !== 'string') {
    console.warn('getCarInfoByVin: vin должен быть строкой')
    return null
  }
  
  const carInfo = vinCarDatabase.find(car => car.vin === vin)
  return carInfo || null
}

// Функция для проверки госномера и получения информации об автомобиле
export const getCarInfoByPlate = (plate) => {
  // Проверка на существование параметра
  if (!plate) {
    return {
      success: false,
      message: 'Не указан госномер',
      data: null
    }
  }
  
  // Проверка на строковый тип
  if (typeof plate !== 'string') {
    return {
      success: false,
      message: 'Госномер должен быть строкой',
      data: null
    }
  }
  
  const vin = getVinByPlate(plate)
  
  if (!vin) {
    // Госномер не найден в базе данных
    return {
      success: false,
      message: 'номер не правильный',
      data: null
    }
  }
  
  const carInfo = getCarInfoByVin(vin)
  
  if (!carInfo) {
    // VIN найден, но информация об автомобиле отсутствует
    return {
      success: false,
      message: 'Информация об автомобиле не найдена',
      data: null
    }
  }
  
  // Успешно найдена информация об автомобиле
  return {
    success: true,
    message: 'Информация об автомобиле успешно загружена',
    data: {
      plate: plate.toUpperCase(),
      vin: vin,
      ...carInfo
    }
  }
}

// Функция для получения всех записей из базы данных
export const getAllPlateVinRecords = () => {
  return [...plateVinDatabase] // Возвращаем копию массива, чтобы избежать мутации оригинальных данных
}

// Функция для получения всех автомобилей из базы данных
export const getAllCars = () => {
  return [...vinCarDatabase] // Возвращаем копию массива, чтобы избежать мутации оригинальных данных
}