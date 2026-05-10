import { useNavigate } from 'react-router-dom'
import InventoryTable from '../components/inventory/InventoryTable'

function AdminInventory() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>LibraStore — Список книг</h1>
      <button onClick={() => navigate('/create')}>+ Додати книгу</button>
      <InventoryTable />
    </div>
  )
}

export default AdminInventory