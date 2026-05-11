import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getInventoryById } from '../services/inventoryApi'
import styles from './AdminInventoryDetails.module.css'

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
    <div className={styles.container}>
    <div className={styles.card}>
      {item.photo
        ? <img className={styles.photo} src={`http://localhost:3001${item.photo}`} alt={item.inventory_name} />
        : <p className={styles.noPhoto}>Фото відсутнє</p>
      }
      <h1 className={styles.title}>{item.inventory_name}</h1>
      <p className={styles.description}>{item.description}</p>
      <button className={styles.btnBack} onClick={() => navigate('/')}>← Назад</button>
    </div>
  </div>
  )
}

export default AdminInventoryDetails