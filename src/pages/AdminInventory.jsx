import { useNavigate } from 'react-router-dom'
import InventoryTable from '../components/inventory/InventoryTable'
import styles from './AdminInventory.module.css'

function AdminInventory() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>LibraStore — Список книг</h1>
        <div className={styles.actions}>
          <button type="button" onClick={() => navigate('/gallery')}>📚 Галерея</button>
          <button type="button" onClick={() => navigate('/favorites')}>❤️ Улюблені</button>
          <button type="button" className={styles.addButton} onClick={() => navigate('/create')}>
            + Додати книгу
          </button>
        </div>
      </div>
      <InventoryTable />
    </div>
  )
}

export default AdminInventory
