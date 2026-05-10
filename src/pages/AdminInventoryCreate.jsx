import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createInventory } from '../services/inventoryApi'

function AdminInventoryCreate() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    inventory_name: '',
    description: ''
  })
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.inventory_name) {
      setError('Назва книги обовязкова')
      return
    }
    try {
      const data = new FormData()
      data.append('inventory_name', formData.inventory_name)
      data.append('description', formData.description)
      if (photo) data.append('photo', photo)
      await createInventory(formData)
      navigate('/')
    } catch (err) {
      setError('Помилка при додаванні книги')
    }
  }

  return (
    <div>
      <h1>Додати книгу</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Назва книги</label>
          <input
            type="text"
            name="inventory_name"
            value={formData.inventory_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Опис</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          </div>
        <div>
          <label>Фото</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        <button type="submit">Додати</button>
        <button type="button" onClick={() => navigate('/')}>Скасувати</button>
      </form>
    </div>
  )
}

export default AdminInventoryCreate