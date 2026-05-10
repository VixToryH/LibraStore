const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())
const DB_PATH = './db.json'
const UPLOADS_DIR = './public/images'

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR)
  },
  filename: (req, file, cb) => {
    cb(null, `item-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage })

app.use(express.json())
app.use('/images', express.static(UPLOADS_DIR))

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))

// GET /inventory
app.get('/inventory', (req, res) => {
  const db = readDB()
  res.json(db.inventory)
})

// GET /inventory/:id
app.get('/inventory/:id', (req, res) => {
  const db = readDB()
  const item = db.inventory.find(i => i.id === req.params.id)
  if (!item) return res.status(404).json({ error: 'Не знайдено' })
  res.json(item)
})

// POST /register
app.post('/register', upload.single('photo'), (req, res) => {
  const db = readDB()
  const item = {
    id: Date.now().toString(),
    inventory_name: req.body.inventory_name,
    description: req.body.description,
    photo: req.file ? `/images/${req.file.filename}` : null
  }
  db.inventory.push(item)
  writeDB(db)
  res.json(item)
})

// PUT /inventory/:id
app.put('/inventory/:id', (req, res) => {
  const db = readDB()
  const index = db.inventory.findIndex(i => i.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Не знайдено' })
  db.inventory[index] = {
    ...db.inventory[index],
    inventory_name: req.body.inventory_name,
    description: req.body.description
  }
  writeDB(db)
  res.json(db.inventory[index])
})

// PUT /inventory/:id/photo
app.put('/inventory/:id/photo', upload.single('photo'), (req, res) => {
  const db = readDB()
  const index = db.inventory.findIndex(i => i.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Не знайдено' })

  const oldPhoto = db.inventory[index].photo
  if (oldPhoto) {
    const oldPath = path.join('.', oldPhoto)
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
  }

  db.inventory[index].photo = req.file ? `/images/${req.file.filename}` : null
  writeDB(db)
  res.json(db.inventory[index])
})

// DELETE /inventory/:id
app.delete('/inventory/:id', (req, res) => {
  const db = readDB()
  const index = db.inventory.findIndex(i => i.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Не знайдено' })

  const photo = db.inventory[index].photo
  if (photo) {
    const photoPath = path.join('.', photo)
    if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath)
  }

  db.inventory.splice(index, 1)
  writeDB(db)
  res.json({ success: true })
})

app.listen(3001, () => {
  console.log('Сервер запущено на порту 3001')
})