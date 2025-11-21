import React, { useState } from 'react'
import './CarSearch.css'

const CarSearch = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [brandFilter, setBrandFilter] = useState('all')

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

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setBrandFilter('all')
    onSearch('')
    onFilter({ status: 'all', brand: 'all' })
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

        {(searchTerm || statusFilter !== 'all' || brandFilter !== 'all') && (
          <button 
            onClick={clearFilters}
            className="clear-filters-button"
          >
            Сбросить фильтры
          </button>
        )}
      </div>
    </div>
  )
}

export default CarSearch