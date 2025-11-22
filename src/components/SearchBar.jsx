import React, { useState } from 'react'
import './CarCard.css'

const SearchBar = ({ 
  onSearch, 
  onFilter, 
  onSort,
  filtersConfig = {
    status: [
      { value: 'all', label: 'Все статусы' },
      { value: 'available', label: 'Доступен' },
      { value: 'rented', label: 'Арендован' },
      { value: 'maintenance', label: 'На обслуживании' }
    ],
    brand: [
      { value: 'all', label: 'Все марки' },
      { value: 'Toyota', label: 'Toyota' },
      { value: 'BMW', label: 'BMW' },
      { value: 'Mercedes', label: 'Mercedes' },
      { value: 'Audi', label: 'Audi' },
      { value: 'Volkswagen', label: 'Volkswagen' },
      { value: 'Nissan', label: 'Nissan' }
    ]
  },
  sortOptions = [
    { value: 'priceAsc', label: 'Цена по возрастанию' },
    { value: 'priceDesc', label: 'Цена по убыванию' }
  ]
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    status: 'all',
    brand: 'all'
  })
  const [sortBy, setSortBy] = useState('priceAsc')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleFilterChange = (filterName, value) => {
    const newFilters = {
      ...filters,
      [filterName]: value
    }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    onSort(value)
  }

  const clearFilters = () => {
    setSearchTerm('')
    const resetFilters = {
      status: 'all',
      brand: 'all'
    }
    setFilters(resetFilters)
    setSortBy('priceAsc')
    onSearch('')
    onFilter(resetFilters)
    onSort('priceAsc')
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="car-search">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Поиск по марке, модели, номеру..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </div>
      </form>

      <div className="filters-toggle">
        <button 
          onClick={toggleFilters}
          className="filters-toggle-button"
        >
          {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
        </button>
      </div>

      {showFilters && (
        <div className="filters">
          <select 
            value={filters.status} 
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            {filtersConfig.status.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select 
            value={filters.brand} 
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="filter-select"
          >
            {filtersConfig.brand.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => handleSortChange(e.target.value)}
            className="filter-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {(searchTerm || filters.status !== 'all' || filters.brand !== 'all' || sortBy !== 'priceAsc') && (
            <button 
              onClick={clearFilters}
              className="clear-filters-button"
            >
              Сбросить
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar