const mongoose = require('../../common/services/mongoose.service').mongoose
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug)

const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tb_categories"
    }
  ],
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tb_users"
  }
})

articleSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

articleSchema.set("toJSON", {
  virtuals: true,
});

articleSchema.findById = function (cb) {
  return this.model("tb_articles").find({id: this.id}, cb);
};

const ArticleModel = mongoose.model("tb_articles", articleSchema)

exports.createArticle = (articleBody) => {
  const article = new ArticleModel(articleBody)
  article.createdAt = new Date().toISOString()
  return article.save()
}

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    ArticleModel.find()
      .populate('categories')
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, articles) {
        if (err) {
          reject(err);
        } else {
          console.log(perPage, page)
          articles = articles.map(article => {
            article = article.toJSON()
            delete article._id;
            delete article.__v;
            return article
          })
          resolve(articles);
        }
      });
  });
};

exports.paging = (perPage = 15) => {
  return new Promise((resolve, reject) => {
    ArticleModel.countDocuments({}, (err, result) => {
      try {
        resolve({
          perPage: perPage,
          totalPages: Math.ceil(result / perPage),
          totalRecords: result
        })
      } catch (e) {
        reject(e)
      }
    })
  })
}

exports.findById = (id) => {
  return ArticleModel.findById(id)
    .then((result) => {
      result = result.toJSON();
      delete result._id;
      delete result.__v;
      return result;
    })
    .catch((err) => {
      return err;
    });
};

exports.findBySlug = (slug) => {
  return ArticleModel.findOne({slug: slug})
    .populate("categories")
    .then((result) => {
      result = result.toJSON();
      delete result._id;
      delete result.__v;
      return result;
    });
};

exports.deleteById = (id) => {
  return ArticleModel.deleteById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  })
}

exports.patchById = (id, articleData) => {
  return new Promise(((resolve, reject) => {
    ArticleModel.findById(id, function (err, article) {
      if (err) reject(err)
      for (let i in articleData) {
        article[i] = articleData[i]
      }
      article.save(function (err, updatedUser) {
        if (err) return reject(err)
        resolve(updatedUser)
      })
    })
  }))
};
