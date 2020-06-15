const FilesController = require('./controllers/files.controller')

exports.routesConfig = (app) => {
  app.post('/upload_file', [
    FilesController.uploadFile
  ])
}