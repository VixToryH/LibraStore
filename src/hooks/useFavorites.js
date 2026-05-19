import { useState, useEffect } from 'react'

const FAVORITES_KEY = 'librastore_favorites'

const normalizeId = (id) => String(id)

export function useFavorites() {
  const [favorites, setFavorites] = useState([])

  // завантаження улюблених з localStorage при старті
  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY)
    if (saved) {
      setFavorites(JSON.parse(saved).map(normalizeId))
    }
  }, [])

  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
  }

  const addFavorite = (id) => {
    const key = normalizeId(id)
    if (!favorites.includes(key)) {
      saveFavorites([...favorites, key])
    }
  }

  const removeFavorite = (id) => {
    saveFavorites(favorites.filter(fav => fav !== normalizeId(id)))
  }

  const isFavorite = (id) => {
    return favorites.includes(normalizeId(id))
  }

  return { favorites, addFavorite, removeFavorite, isFavorite }
}