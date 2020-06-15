const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const fileUpload = require('express-fileupload');

const app = express();

const config = require("./src/common/config/env.config");

const AuthorizationRouter = require("./src/authorization/routes.config");
const UserRouter = require("./src/users/routes.config");
const ArticleRouter = require("./src/articles/routes.config");
const CategoryRouter = require("./src/categories/routes.config");
const FileRouter = require("./src/files/routes.config");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});

app.use('/api-docs', function (req, res, next) {
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next()
  }, swaggerUi.serve, swaggerUi.setup()
);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(fileUpload({
  createParentPath: true,
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
  },
}))

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.use('/images', express.static('images'));

AuthorizationRouter.routesConfig(app);
UserRouter.routesConfig(app)
ArticleRouter.routesConfig(app)
CategoryRouter.routesConfig(app)
FileRouter.routesConfig(app)

app.listen(config.port, function () {
  console.log("app listening at port %s", config.port);
});
