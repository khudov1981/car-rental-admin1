import React, { useState } from 'react'
import './CarSearch.css'

const CarSearch = ({ onSearch, onFilter, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [brandFilter, setBrandFilter] = useState('all')
  const [sortBy, setSortBy] = useState('priceAsc')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleStatusChange = (e) => {
    const status = e.target.value
    setStatusFilter(status)
    onFilter({ status, brand: brandFilter })
  }

  const handleBrandChange = (e) => {
    const brand = e.target.value
    setBrandFilter(brand)
    onFilter({ status: statusFilter, brand })
  }

  const handleSortChange = (e) => {
    const sort = e.target.value
    setSortBy(sort)
    onSort(sort)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setBrandFilter('all')
    setSortBy('priceAsc')
    onSearch('')
    onFilter({ status: 'all', brand: 'all' })
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
            value={statusFilter} 
            onChange={handleStatusChange}
            className="filter-select"
          >
            <option value="all">Все статусы</option>
            <option value="available">Доступен</option>
            <option value="rented">Арендован</option>
            <option value="maintenance">На обслуживании</option>
          </select>

          <select 
            value={brandFilter} 
            onChange={handleBrandChange}
            className="filter-select"
          >
            <option value="all">Все марки</option>
            <option value="Toyota">Toyota</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Nissan">Nissan</option>
          </select>

          <select 
            value={sortBy} 
            onChange={handleSortChange}
            className="filter-select"
          >
            <option value="priceAsc">Цена по возрастанию</option>
            <option value="priceDesc">Цена по убыванию</option>
          </select>

          {(searchTerm || statusFilter !== 'all' || brandFilter !== 'all' || sortBy !== 'priceAsc') && (
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

export default CarSearch