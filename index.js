var express = require('express');
var multer = require('multer');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var upload = multer({ dest: 'uploads/' });
const fs = require('fs');

var validator = require('./validator.js');
var qr = require('./qrcode.js');
var printer = require('./print.js');

app.use(function (req, res, next) {
//   console.log(req.files); // JSON Object
  next();
});

server.listen(port, function () {
  console.log('Server successfully running at:-', port);
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/file-upload.html');
})

app.post('/upload', upload.single('dgc'),  function(req, res) {
//   console.log(req.file.filename); // JSON Object

    qr.decoder(
      __dirname+'/uploads/'+req.file.filename,
      function(err, qr) {
        if (err) {
          res.end("QR Code invalido"); return;
        }
        
        // console.log(qr.result)

        validator.check(qr.result, false).then((response) => {
          // console.log(response);
          if (response.code != "VALID"){
            res.end("GreenPass scaduto o invalido"); return;
          }

          printer.pdf({
              img_dir: __dirname+'/uploads/'+req.file.filename,
              name: response.person,
              expire: response.message.split(" - ")[2].replace(" ] ","").substring(0, 10)
            }, res
          )

          fs.unlinkSync(__dirname+'/uploads/'+req.file.filename)
        })

      }
    )

});