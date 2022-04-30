const multer = require('multer')
const path = require('path')
const tempDir = path.join(__dirname, '../', 'temp')

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048,
  },
})

const typesFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const uploadAvatar = multer({
  storage: multerConfig,
  fileFilter: typesFilter
})

module.exports = uploadAvatar
