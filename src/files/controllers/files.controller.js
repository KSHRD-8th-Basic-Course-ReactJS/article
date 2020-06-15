const { v4: uuidv4 } = require('uuid');

exports.uploadFile = async (req, res) => {

  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let image = req.files.image;
      let re = /(?:\.([^.]+))?$/;
      let ext = re.exec(image ? image.name : ".jpg")[1];
      let imagePicture = uuidv4() + "." + ext

      // await image.mv('http' + "://" + req.headers.host + "/images/" + imagePicture);
      // console.log('http' + "://" + req.headers.host + "/images/" + imagePicture)

      await image.mv("./images/" + imagePicture);
      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: imagePicture,
          mimetype: image.mimetype,
          size: image.size
        }
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }

}