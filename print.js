const PDFDocument = require('pdfkit');
const fs = require('fs');
const { callbackify } = require('util');

const pdf = function(details, res) {

    const doc = new PDFDocument({size: 'A4', layout: 'landscape', margin: 15});

    doc.pipe(res);

    doc.image(details.img_dir, {
    fit: [140, 140],
    align: 'left',
    valign: 'top'
    });

    doc.moveDown()
    doc.fontSize(14);
    doc.text(details.name, {
    width: 140,
    align: 'left'
    })

    // doc.moveDown()
    doc.fontSize(10)
    doc.text("Scad. GreenPass: "+details.expire, {
    width: 140,
    align: 'left'
    })

    doc.moveDown()
    // doc.fontSize(8)
    // doc.text("realizzato da", {align: 'left'});
    doc.fontSize(10)
    doc.text("realizzato da      videoforyou.it\n               338 202 8075", {align: 'right', underline: false, width:135})
    // doc.text("338 202 8075", {
    // width: 150,
    // align: 'right',
    // underline: true
    // })

    doc.page.dictionary.data.Rotate = 180
    doc.end();
}
module.exports = {pdf}
