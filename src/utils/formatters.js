// Общая функция для очистки и форматирования значения
const cleanAndFormat = (value, pattern) => {
  // Проверка на существование значения
  if (!value) return ''
  
  // Проверка на строковый тип
  if (typeof value !== 'string') {
    console.warn('cleanAndFormat: значение не является строкой', value)
    return ''
  }
  
  // Очистка значения от лишних символов
  let cleanValue = value.replace(/[^A-Z0-9А-Я]/gi, '').toUpperCase()
  
  // Форматирование в соответствии с шаблоном
  let formattedValue = ''
  let cleanIndex = 0
  
  for (let i = 0; i < pattern.length && cleanIndex < cleanValue.length; i++) {
    if (pattern[i] === 'X' || pattern[i] === '0') {
      formattedValue += cleanValue[cleanIndex]
      cleanIndex++
    } else {
      formattedValue += pattern[i]
    }
  }
  
  return formattedValue
}

// Форматирование отображаемого значения госномера
export const formatPlateDisplay = (value) => {
  // Проверка на существование значения
  if (!value) return ''
  
  // Проверка на строковый тип
  if (typeof value !== 'string') {
    console.warn('formatPlateDisplay: значение не является строкой', value)
    return ''
  }
  
  // Формат: X000XX000 (1 буква, 3 цифры, 2 буквы, 2-3 цифры региона)
  return cleanAndFormat(value, 'X000XX000')
}

// Форматирование отображаемого значения ОСАГО
export const formatInsuranceDisplay = (value) => {
  // Проверка на существование значения
  if (!value) return ''
  
  // Проверка на строковый тип
  if (typeof value !== 'string') {
    console.warn('formatInsuranceDisplay: значение не является строкой', value)
    return ''
  }
  
  // Формат: XXX0000000000 (3 буквы, 10 цифр)
  return cleanAndFormat(value, 'XXX0000000000')
}