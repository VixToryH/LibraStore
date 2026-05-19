import { useState, useEffect } from 'react'

const FAVORITES_KEY = 'librastore_favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState([])

  // завантаження улюблених з localStorage при старті
  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY)
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
  }

  const addFavorite = (id) => {
    if (!favorites.includes(id)) {
      saveFavorites([...favorites, id])
    }
  }

  const removeFavorite = (id) => {
    saveFavorites(favorites.filter(fav => fav !== id))
  }

  const isFavorite = (id) => {
    return favorites.includes(id)
  }

  return { favorites, addFavorite, removeFavorite, isFavorite }
}