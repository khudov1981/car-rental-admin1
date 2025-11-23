import React, { useState } from 'react'
import './Settings.css'

const Settings = ({ telegramUser, onClearData }) => {
  const [activeTab, setActiveTab] = useState('general')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  })
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('ru')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const handleSave = () => {
    // Здесь будет логика сохранения настроек
    alert('Настройки сохранены!')
  }

  const handleClearData = () => {
    setIsDeleteModalOpen(true)
  }

  const confirmClearData = () => {
    onClearData()
    setIsDeleteModalOpen(false)
    alert('Все данные очищены!')
  }

  const cancelClearData = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>Настройки</h2>
      </div>

      <div className="settings-tabs">
        <button 
          className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          Общие
        </button>
        <button 
          className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Уведомления
        </button>
        <button 
          className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Аккаунт
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'general' && (
          <div className="settings-section">
            <h3>Общие настройки</h3>
            
            <div className="setting-item">
              <label>Тема приложения</label>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                className="tg-select"
              >
                <option value="light">Светлая</option>
                <option value="dark">Темная</option>
                <option value="auto">Автоматически</option>
              </select>
            </div>

            <div className="setting-item">
              <label>Язык</label>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="tg-select"
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="setting-item">
              <label>Валюта</label>
              <select className="tg-select">
                <option>Рубль (₽)</option>
                <option>Доллар ($)</option>
                <option>Евро (€)</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="settings-section">
            <h3>Уведомления</h3>
            
            <div className="setting-item">
              <div className="setting-toggle">
                <span>Уведомления по email</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <p className="setting-description">Получать уведомления о бронированиях и оплатах на email</p>
            </div>

            <div className="setting-item">
              <div className="setting-toggle">
                <span>Push-уведомления</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <p className="setting-description">Получать мгновенные уведомления в приложении</p>
            </div>

            <div className="setting-item">
              <div className="setting-toggle">
                <span>SMS-уведомления</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <p className="setting-description">Получать SMS-уведомления о важных событиях</p>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="settings-section">
            <h3>Аккаунт</h3>
            
            {telegramUser && (
              <div className="account-info">
                <div className="account-avatar">
                  <div className="avatar-placeholder">
                    {telegramUser.first_name?.charAt(0) || 'U'}
                  </div>
                </div>
                <div className="account-details">
                  <h4>{telegramUser.first_name} {telegramUser.last_name || ''}</h4>
                  <p className="account-id">ID: {telegramUser.id}</p>
                  <p className="account-username">@{telegramUser.username || 'не указан'}</p>
                </div>
              </div>
            )}

            <div className="setting-item">
              <h4>Очистка данных</h4>
              <p className="setting-description">Удаление всех данных приложения. Это действие нельзя отменить.</p>
              <button 
                className="tg-button danger"
                onClick={handleClearData}
              >
                Очистить все данные
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="settings-footer">
        <button className="tg-button" onClick={handleSave}>
          Сохранить настройки
        </button>
      </div>

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Подтверждение очистки данных</h3>
            <p>Вы уверены, что хотите удалить все данные приложения? Это действие нельзя отменить.</p>
            <div className="modal-actions">
              <button className="tg-button secondary" onClick={cancelClearData}>
                Отмена
              </button>
              <button className="tg-button danger" onClick={confirmClearData}>
                Удалить все данные
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings