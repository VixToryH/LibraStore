import { useNavigate } from 'react-router-dom'
import InventoryGallery from '../components/gallery/InventoryGallery'
import styles from './Gallery.module.css'

function Gallery() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Галерея книг</h1>
        <div className={styles.nav}>
          <button onClick={() => navigate('/gallery')} className={styles.active}>Всі книги</button>
          <button onClick={() => navigate('/favorites')}>❤️ Улюблені</button>
          <button onClick={() => navigate('/')}>⚙️ Адмін панель</button>
        </div>
      </div>
      <InventoryGallery showOnlyFavorites={false} />
    </div>
  )
}

export default Gallery