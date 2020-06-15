const mongoose = require('../../common/services/mongoose.service').mongoose
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug)

const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    slug: "name",
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date
  },
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tb_articles"
    }
  ]
})

categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

categorySchema.set("toJSON", {
  virtuals: true,
});

categorySchema.findById = function (cb) {
  return this.model("tb_categories").find({id: this.id}, cb);
};

const CategoryModel = mongoose.model("tb_categories", categorySchema)

exports.createCategory = (categoryBody) => {
  const category = new CategoryModel(categoryBody)
  category.createdAt = new Date().toISOString()
  return category.save()
}

exports.list = () => {
  return new Promise((resolve, reject) => {
    CategoryModel.find()
      .populate('articles')
      .then((articles) => {
        articles = articles.map(article => {
          article = article.toJSON()
          delete article._id;
          delete article.__v;
          return article
        })
        resolve(articles)
      }).catch((err) => {
      reject(err);
    });
  });
};
