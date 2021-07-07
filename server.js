
var express = require("express");
const cors = require("cors");
const fs = require('fs');
const imageUploader = require('./helpers/image-uploader');

var app = express();

app.use(cors());

app.post(
  "/upload",imageUploader.upload.single("upload"),
  function (req, res) {
    console.log(req.file.filename);
    if(req.file.filename){
      return res.status(200).end();
    }else return res.status(401).end();
  }
);

app.get("/uploads/:upload", function (req, res) {
  file = req.params.upload;
  console.log(req.params.upload);
  var img = fs.readFileSync(__dirname + "/uploads/" + file);
  res.writeHead(200, { "Content-Type": "image/*" });
  res.end(img, "binary");
});


const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
