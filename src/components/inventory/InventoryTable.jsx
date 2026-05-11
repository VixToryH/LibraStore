import { useEffect, useState } from 'react'
import { getInventory, deleteInventory } from '../../services/inventoryApi'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from './ConfirmModal'
import styles from './InventoryTable.module.css'
import { useInventory } from '../../store/InventoryContext'

function InventoryTable() {
  const { inventory, setInventory } = useInventory()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
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

  const handleDelete = async () => {
    try {
      await deleteInventory(deleteId)
      setDeleteId(null)
      fetchInventory()
    } catch (err) {
      setError('Помилка при видаленні')
    }
  }

  if (loading) return <p className={styles.message}>Завантаження...</p>
  if (error) return <p className={styles.message}>{error}</p>
  if (inventory.length === 0) return <p className={styles.message}>Книг немає</p>

  return (
    <div className={styles.tableWrapper}>
    {deleteId && (
      <ConfirmModal
        message="Ти точно хочеш видалити цю книгу?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    )}
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Назва</th>
          <th>Опис</th>
          <th>Фото</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item.id}>
            <td>{item.inventory_name}</td>
            <td>{item.description}</td>
            <td>
             {item.photo
                ? <img className={styles.photo} src={`http://localhost:3001${item.photo}`} alt={item.inventory_name} />
                : <span className={styles.noPhoto}>Немає фото</span>
             }
            </td>
            <td>
            <div className={styles.actions}>
                <button className={styles.btnView} onClick={() => navigate(`/details/${item.id}`)}>Переглянути</button>
                  <button className={styles.btnEdit} onClick={() => navigate(`/edit/${item.id}`)}>Редагувати</button>
                  <button className={styles.btnDelete} onClick={() => setDeleteId(item.id)}>Видалити</button>
                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
}

export default InventoryTable