const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './assets')
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_') // accès au nom original 
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + Date.now() + '.' + extension) // filename final
  }
})

module.exports = multer({storage: storage}).single('image') // fichier unique et de format image