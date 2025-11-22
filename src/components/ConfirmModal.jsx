import React from 'react'
import './ConfirmModal.css'

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Подтверждение', 
  message = 'Вы уверены?', 
  confirmText = 'Да', 
  cancelText = 'Отмена',
  confirmButtonClass = 'confirm-button',
  cancelButtonClass = 'cancel-button',
  showCancel = true,
  onSecondaryAction = null,
  secondaryText = '',
  secondaryButtonClass = 'secondary-button'
}) => {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction()
      onClose()
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          {showCancel && (
            <button className={cancelButtonClass} onClick={handleCancel}>
              {cancelText}
            </button>
          )}
          {onSecondaryAction && (
            <button className={secondaryButtonClass} onClick={handleSecondaryAction}>
              {secondaryText}
            </button>
          )}
          <button className={confirmButtonClass} onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal