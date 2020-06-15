const CategoryModel = require('../models/category.models')

exports.list = (req, res) => {
  CategoryModel.list().then(result => {
    res.status(200).send({
      code: 200,
      success: true,
      data: result,
    })
  })
}

exports.createCategory = (req, res) => {
  CategoryModel.createCategory(req.body).then((result) => {
    res.status(200).send({
      code: 200,
      success: true,
      data: result,
    })
  })
}