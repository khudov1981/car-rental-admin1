import React, { useState } from 'react'

const ImageUploader = ({ 
  photos = Array(5).fill(null), 
  onPhotosChange,
  maxPhotos = 5,
  mode = 'add'
}) => {
  const [dragActive, setDragActive] = useState(false)

  const handleFile = (file) => {
    // Проверка типа файла
    if (!file.type.match('image.*')) {
      alert('Пожалуйста, выберите изображение (jpg, png, gif)')
      return
    }
    
    // Проверка размера файла (не более 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5MB')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const newPhotos = [...photos]
      // Найдем первую пустую позицию
      const emptyIndex = newPhotos.findIndex(photo => photo === null)
      if (emptyIndex !== -1) {
        newPhotos[emptyIndex] = e.target.result
        onPhotosChange(newPhotos)
      } else {
        alert('Достигнуто максимальное количество фотографий')
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const removePhoto = (index) => {
    const newPhotos = [...photos]
    newPhotos[index] = null
    onPhotosChange(newPhotos)
  }

  const onButtonClick = () => {
    // Проверяем, есть ли пустые слоты
    const emptyIndex = photos.findIndex(photo => photo === null)
    if (emptyIndex !== -1) {
      document.getElementById('image-upload-input').click()
    } else {
      alert('Достигнуто максимальное количество фотографий')
    }
  }

  return (
    <div className="image-uploader">
      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          <div className="upload-icon">📷</div>
          <p>Перетащите фотографии сюда или нажмите для выбора</p>
          <p className="upload-hint">Поддерживаемые форматы: JPG, PNG, GIF (до 5MB)</p>
        </div>
        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <button 
          type="button" 
          className="tg-button upload-button"
          onClick={onButtonClick}
        >
          Выбрать фотографии
        </button>
      </div>
      
      <div className="photos-preview">
        {photos.map((photo, index) => (
          <div key={index} className="photo-slot">
            {photo ? (
              <div className="photo-preview">
                <img src={photo} alt={`Фото ${index + 1}`} />
                <button 
                  type="button" 
                  className="remove-photo-button"
                  onClick={() => removePhoto(index)}
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="photo-placeholder">
                <div className="placeholder-icon">+</div>
                <div className="placeholder-text">Фото {index + 1}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUploader