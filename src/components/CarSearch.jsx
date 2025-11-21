import React, { useState } from 'react'
import './CarSearch.css'

const CarSearch = ({ onSearch, onFilter, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [brandFilter, setBrandFilter] = useState('all')
  const [sortBy, setSortBy] = useState('brand')

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
    setSortBy('brand')
    onSearch('')
    onFilter({ status: 'all', brand: 'all' })
    onSort('brand')
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

        <select 
          value={sortBy} 
          onChange={handleSortChange}
          className="filter-select"
        >
          <option value="brand">Сортировка по марке</option>
          <option value="priceAsc">Цена по возрастанию</option>
          <option value="priceDesc">Цена по убыванию</option>
          <option value="yearDesc">Год (новые первые)</option>
          <option value="yearAsc">Год (старые первые)</option>
        </select>

        {(searchTerm || statusFilter !== 'all' || brandFilter !== 'all' || sortBy !== 'brand') && (
          <button 
            onClick={clearFilters}
            className="clear-filters-button"
          >
            Сбросить
          </button>
        )}
      </div>
    </div>
  )
}

export default CarSearch