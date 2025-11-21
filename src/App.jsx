import React, { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'

function App() {
  const [activePage, setActivePage] = useState('cars')

  return (
    <div className="App">
      <h1>Car Rental Admin</h1>
      
      {activePage === 'cars' && (
        <div className="page-content">
          <h2>Автомобили</h2>
          <p>Здесь будет список автомобилей</p>
        </div>
      )}
      
      {activePage === 'clients' && (
        <div className="page-content">
          <h2>Клиенты</h2>
          <p>Здесь будет список клиентов</p>
        </div>
      )}
      
      <Navigation activePage={activePage} setActivePage={setActivePage} />
    </div>
  )
}

export default App