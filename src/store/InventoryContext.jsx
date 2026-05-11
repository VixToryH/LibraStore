import { createContext, useContext, useState } from 'react'

const InventoryContext = createContext()

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([])

  return (
    <InventoryContext.Provider value={{ inventory, setInventory }}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  return useContext(InventoryContext)
}