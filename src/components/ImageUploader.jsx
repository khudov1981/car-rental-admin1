import React, { useState, useRef } from 'react'

const ImageUploader = ({ photos = Array(5).fill(null), onPhotosChange, maxPhotos = 5, mode = 'add' }) => {
  const fileInputRefs = useRef([])
  
  const handleFileSelect = (index, file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newPhotos = [...photos]
        newPhotos[index] = e.target.result
        onPhotosChange(newPhotos)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleFileInputChange = (index, e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileSelect(index, file)
    }
  }
  
  const handleRemovePhoto = (index) => {
    const newPhotos = [...photos]
    newPhotos[index] = null
    onPhotosChange(newPhotos)
  }
  
  const triggerFileInput = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click()
    }
  }
  
  return (
    <div className="image-uploader">
      <div className="photos-grid">
        {Array.from({ length: maxPhotos }).map((_, index) => (
          <div key={index} className="photo-slot">
            {photos[index] ? (
              <div className="photo-preview">
                <img src={photos[index]} alt={`Фото ${index + 1}`} />
                <button 
                  type="button" 
                  className="remove-photo-button"
                  onClick={() => handleRemovePhoto(index)}
                >
                  ×
                </button>
              </div>
            ) : (
              <div 
                className="photo-placeholder"
                onClick={() => triggerFileInput(index)}
              >
                <div className="placeholder-content">
                  <span className="plus-icon">+</span>
                  <span className="photo-number">{index + 1}</span>
                </div>
                <input
                  type="file"
                  ref={el => fileInputRefs.current[index] = el}
                  onChange={(e) => handleFileInputChange(index, e)}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="upload-hint">
        {mode === 'add' ? (
          <p>Необходимо загрузить {maxPhotos} фотографий автомобиля</p>
        ) : (
          <p>Загрузите до {maxPhotos} фотографий автомобиля</p>
        )}
        <p className="hint">Нажмите на пустое поле, чтобы загрузить фото</p>
      </div>
    </div>
  )
}

export default ImageUploader