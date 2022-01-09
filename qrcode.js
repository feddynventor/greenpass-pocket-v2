const Jimp = require("jimp");
const fs = require('fs')
const qrCode = require('qrcode-reader');

const decoder = function(path, callback) {
    const buffer = fs.readFileSync(path);
    Jimp.read(buffer, function(err, image) {
        if (err) {
            console.error(err);
        }
        let qrcode = new qrCode();
        qrcode.callback = callback;
        qrcode.decode(image.bitmap);
    });
}
// console.log(decoder(__dirname+'/uploads/fe01cc6437ca0f37500d74d9392df5b7', function(err, value) {
//     if (err)
//         console.error(err);
//     result_string = value.result
// }))
module.exports = {decoder}