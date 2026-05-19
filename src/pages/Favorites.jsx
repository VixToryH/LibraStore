import { useNavigate } from 'react-router-dom'
import InventoryGallery from '../components/gallery/InventoryGallery'
import styles from './Favorites.module.css'

function Favorites() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>❤️ Мої улюблені</h1>
        <div className={styles.nav}>
          <button onClick={() => navigate('/gallery')}>Всі книги</button>
          <button onClick={() => navigate('/favorites')} className={styles.active}>❤️ Улюблені</button>
          <button onClick={() => navigate('/')}>⚙️ Адмін панель</button>
        </div>
      </div>
      <InventoryGallery showOnlyFavorites={true} />
    </div>
  )
}

export default Favorites