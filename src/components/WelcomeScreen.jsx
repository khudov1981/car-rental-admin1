import React from 'react'
import './WelcomeScreen.css'

const WelcomeScreen = ({ onStart, user }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-icon">🚗</div>
        <h1>Добро пожаловать!</h1>
        {user ? (
          <h2>Привет, {user.first_name}!</h2>
        ) : (
          <h2>Добро пожаловать в Car Rental Admin</h2>
        )}
        <p>Управляйте своим автопарком прямо в Telegram</p>
        <button className="tg-button start-button" onClick={onStart}>
          Начать работу
        </button>
      </div>
    </div>
  )
}

export default WelcomeScreen