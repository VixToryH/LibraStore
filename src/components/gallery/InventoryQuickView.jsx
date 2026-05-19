import { useEffect } from 'react'
import { getInventoryById } from '../../services/inventoryApi'
import styles from './InventoryQuickView.module.css'
import { useState } from 'react'

function InventoryQuickView({ item, isFavorite, onFavoriteToggle, onClose }) {
  const [fullItem, setFullItem] = useState(item)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFullItem()
  }, [item.id])

  // запитує повні дані з сервера
  const fetchFullItem = async () => {
    try {
      const response = await getInventoryById(item.id)
      setFullItem(response.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  // закриває модал при кліку на темний фон
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        {loading ? (
          <p>Завантаження...</p>
        ) : (
          <>
            {fullItem.photo && (
              <img className={styles.image} src={`http://localhost:3001${fullItem.photo}`} alt={fullItem.inventory_name} />
            )}

            <h2 className={styles.title}>{fullItem.inventory_name}</h2>
            <p className={styles.description}>{fullItem.description}</p>

            <button
              className={styles.favoriteBtn}
              onClick={() => onFavoriteToggle(fullItem.id)}
            >
              {isFavorite(fullItem.id) ? '❤️ Видалити з улюблених' : '🤍 Додати в улюблені'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default InventoryQuickView