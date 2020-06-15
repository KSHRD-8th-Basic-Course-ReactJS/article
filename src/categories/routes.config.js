const CategoryController = require('./controllers/category.controllers')

exports.routesConfig = function (app) {
  app.post("/categories", [
    CategoryController.createCategory
  ])
}