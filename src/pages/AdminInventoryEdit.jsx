import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getInventoryById, updateInventory, updateInventoryPhoto } from '../services/inventoryApi'

function AdminInventoryEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    inventory_name: '',
    description: ''
  })
  const [photo, setPhoto] = useState(null)
  const [currentPhoto, setCurrentPhoto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchItem()
  }, [])

  const fetchItem = async () => {
    try {
      const response = await getInventoryById(id)
      setFormData({
        inventory_name: response.data.inventory_name,
        description: response.data.description
      })
      setCurrentPhoto(response.data.photo)
      setLoading(false)
    } catch (err) {
      setError('Помилка завантаження')
      setLoading(false)
    }
  }

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
      await updateInventory(id, formData)
      if (photo) {
        const photoData = new FormData()
        photoData.append('photo', photo)
        await updateInventoryPhoto(id, photoData)
      }
      navigate('/')
    } catch (err) {
      setError('Помилка при оновленні книги')
    }
  }

  if (loading) return <p>Завантаження...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Редагувати книгу</h1>
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
          {currentPhoto && (
            <img src={`http://localhost:3001${currentPhoto}`} alt="поточне фото" width={100} />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        <button type="submit">Зберегти</button>
        <button type="button" onClick={() => navigate('/')}>Скасувати</button>
      </form>
    </div>
  )
}

export default AdminInventoryEdit