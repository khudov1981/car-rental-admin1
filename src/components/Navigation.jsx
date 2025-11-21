import React from 'react'
import './Navigation.css'

function Navigation({ activePage, setActivePage }) {
  return (
    <nav className="bottom-navigation">
      <button 
        className={`nav-button ${activePage === 'cars' ? 'active' : ''}`}
        onClick={() => setActivePage('cars')}
      >
        <div className="icon">🚗</div>
        <span>Авто</span>
      </button>
      
      <button 
        className={`nav-button ${activePage === 'clients' ? 'active' : ''}`}
        onClick={() => setActivePage('clients')}
      >
        <div className="icon">👥</div>
        <span>Клиенты</span>
      </button>
    </nav>
  )
}

export default Navigation