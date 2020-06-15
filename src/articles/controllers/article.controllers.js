const ArticleModel = require('../models/article.models')

exports.list = (req, res) => {
  let limit = req.query.per_page && req.query.per_page <= 100 ? parseInt(req.query.per_page) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page - 1 : 0;
    }
  }
  ArticleModel.paging(limit).then(paging => {
    ArticleModel.list(limit, page).then(result => {
      res.status(200).send({
        code: 200,
        success: true,
        data: result,
        paging: paging
      })
    })
  })
}

exports.createArticle = (req, res) => {
  ArticleModel.createArticle(req.body).then((result) => {
    res.status(200).send({
      code: 200,
      success: true,
      data: result
    });
  })
}

exports.findById = (req, res) => {
  ArticleModel.findById(req.params.articleId).then((result) => {
    res.status(200).send({
      code: 200,
      success: true,
      data: result
    })
  })
}

exports.findBySlug = (req, res) => {
  ArticleModel.findBySlug(req.params.slug).then((result) => {
    res.status(200).send({
      code: 200,
      success: true,
      data: result
    })
  })
}

exports.deleteById = (req, res) => {
  ArticleModel.deleteById(req.params.articleId).then((result) => {
    res.status(200).send({
      code: 200,
      success: true,
      data: result
    })
  })
}

exports.patchById = (req, res) => {
  ArticleModel.patchById(req.params.articleId, req.body).then((result) => {
    res.status(200).send({
      code: 200,
      success: true,
      data: result
    })
  })
  //   .catch((err) => {
  //   res.status(200).send({
  //     code: 200,
  //     success: true,
  //     data: err
  //   })
  // })
}