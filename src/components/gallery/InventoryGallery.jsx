import { useEffect, useState } from 'react'
import { getInventory } from '../../services/inventoryApi'
import { useInventory } from '../../store/InventoryContext'
import { useFavorites } from '../../hooks/useFavorites'
import InventoryCard from './InventoryCard'
import InventoryQuickView from './InventoryQuickView'
import styles from './InventoryGallery.module.css'

function InventoryGallery({ showOnlyFavorites = false }) {
  const { inventory, setInventory } = useInventory()
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const response = await getInventory()
      setInventory(response.data)
      setLoading(false)
    } catch (err) {
      setError('Помилка завантаження')
      setLoading(false)
    }
  }

  // обробка кліку на серце
  const handleFavoriteToggle = (id) => {
    if (isFavorite(id)) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  // показує тільки улюблені якщо потрібно
  const displayItems = showOnlyFavorites
    ? inventory.filter(item => isFavorite(item.id))
    : inventory

  if (loading) return <p className={styles.message}>Завантаження...</p>
  if (error) return <p className={styles.message}>{error}</p>
  if (displayItems.length === 0) return <p className={styles.message}>Нічого не знайдено</p>

  return (
    <>
      <div className={styles.gallery}>
        {displayItems.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            onCardClick={setSelectedItem}
            isFavorite={isFavorite}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>

      {/* модал відкривається коли selectedItem не null */}
      {selectedItem && (
        <InventoryQuickView
          item={selectedItem}
          isFavorite={isFavorite}
          onFavoriteToggle={handleFavoriteToggle}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  )
}

export default InventoryGallery