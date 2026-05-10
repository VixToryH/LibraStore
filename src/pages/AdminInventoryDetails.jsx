import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getInventoryById } from '../services/inventoryApi'

function AdminInventoryDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchItem()
  }, [])

  const fetchItem = async () => {
    try {
      const response = await getInventoryById(id)
      setItem(response.data)
      setLoading(false)
    } catch (err) {
      setError('Помилка завантаження')
      setLoading(false)
    }
  }

  if (loading) return <p>Завантаження...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>{item.inventory_name}</h1>
      <p>{item.description}</p>
      <button onClick={() => navigate('/')}>← Назад</button>
    </div>
  )
}

export default AdminInventoryDetails