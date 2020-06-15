const ValidationMiddleware = require("../common/middlewares/auth.validation.middleware");

const ArticleController = require('./controllers/article.controllers')

exports.routesConfig = function (app) {
  app.post("/articles", [
    // ValidationMiddleware.validJWTNeeded,
    ArticleController.createArticle
  ])

  app.get("/articles", [
    // ValidationMiddleware.validJWTNeeded,
    ArticleController.list
  ])

  app.get("/articles/:articleId", [
    ValidationMiddleware.validJWTNeeded,
    ArticleController.findById
  ]);

  app.get("/articles/:slug", [
    ValidationMiddleware.validJWTNeeded,
    ArticleController.findBySlug
  ]);

  app.delete("/articles/:articleId", [
    ValidationMiddleware.validJWTNeeded,
    ArticleController.deleteById
  ]);

  app.patch("/articles/:articleId", [
    ValidationMiddleware.validJWTNeeded,
    ArticleController.patchById
  ])
}