import { useState } from 'react'
import styles from './InventoryCard.module.css'

function InventoryCard({ item, onCardClick, isFavorite, onFavoriteToggle }) {
  // показує прев'ю фото при наведенні
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className={styles.card}>
      {/* клік на картку відкриває модал */}
      <div className={styles.imageWrapper} onClick={() => onCardClick(item)}>
        {!imageLoaded && <div className={styles.skeleton}>Завантаження...</div>}
        <img
          className={styles.image}
          src={`http://localhost:3001${item.photo}`}
          alt={item.inventory_name}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{item.inventory_name}</h3>
        
        <button
          className={styles.favoriteBtn}
          onClick={() => onFavoriteToggle(item.id)}
        >
          {isFavorite(item.id) ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  )
}

export default InventoryCard