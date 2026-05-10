import { useEffect, useState } from 'react'
import { getInventory, deleteInventory } from '../../services/inventoryApi'
import { useNavigate } from 'react-router-dom'

function InventoryTable() {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const response = await getInventory()
      setInventory(response.data)
      setLoading(false)
    } catch (err) {
      setError('Помилка завантаження даних')
      setLoading(false)
    }
  }

  if (loading) return <p>Завантаження...</p>
  if (error) return <p>{error}</p>
  if (inventory.length === 0) return <p>Книг немає</p>

  return (
    <table>
      <thead>
        <tr>
          <th>Назва</th>
          <th>Опис</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item.id}>
            <td>{item.inventory_name}</td>
            <td>{item.description}</td>
            <td>
              <button onClick={() => navigate(`/details/${item.id}`)}>Переглянути</button>
              <button onClick={() => navigate(`/edit/${item.id}`)}>Редагувати</button>
              <button onClick={() => handleDelete(item.id)}>Видалити</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default InventoryTable