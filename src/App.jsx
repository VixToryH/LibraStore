import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminInventory from './pages/AdminInventory'
import AdminInventoryCreate from './pages/AdminInventoryCreate'
import AdminInventoryEdit from './pages/AdminInventoryEdit'
import AdminInventoryDetails from './pages/AdminInventoryDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminInventory />} />
        <Route path="/create" element={<AdminInventoryCreate />} />
        <Route path="/edit/:id" element={<AdminInventoryEdit />} />
        <Route path="/details/:id" element={<AdminInventoryDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App