import React from 'react'

const ImageUploader = ({ 
  photos, 
  onPhotosChange, 
  maxPhotos = 5,
  mode = 'add' // 'add' или 'edit'
}) => {
  // Обработчик изменения фотографии
  const handlePhotoChange = (index, file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newPhotos = [...photos]
        newPhotos[index] = e.target.result
        onPhotosChange(newPhotos)
      }
      reader.readAsDataURL(file)
    }
  }

  // Обработчик удаления фотографии
  const handleRemovePhoto = (index) => {
    const newPhotos = [...photos]
    newPhotos[index] = null
    onPhotosChange(newPhotos)
  }

  // Рендеринг блоков для загрузки фотографий
  const renderPhotoUploaders = () => {
    return (
      <div className="photos-grid">
        {Array.from({ length: maxPhotos }).map((_, index) => (
          <div key={index} className="photo-placeholder">
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
              <div className="photo-upload-area">
                <div className="photo-placeholder-text">Фото {index + 1}</div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(index, e.target.files[0])}
                  className="photo-input"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return renderPhotoUploaders()
}

export default ImageUploader