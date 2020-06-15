const mongoose = require('mongoose');

require('dotenv').config()

let count = 0;

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  //getting rid off the depreciation errors
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectWithRetry = () => {
  console.log("MongoDB connection with retry");
  // const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/dev'
  const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blog-cluster0-mwira.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  mongoose.connect(
    mongoURL,
    options
  )
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log(
        "MongoDB connection unsuccessful, retry after 5 seconds. ",
        ++count,
        err
      );
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

exports.mongoose = mongoose;