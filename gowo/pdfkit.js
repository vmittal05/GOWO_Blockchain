const PDFDocument = require('pdfkit');
const doc = new PDFDocument;
const fs = require('fs');

doc.pipe(fs.createWriteStream('./file.pdf'));

doc.fontSize(25).text('Transaction Details :', 100, 80);
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.';
doc
  .text('And here is some wrapped text...', 100, 300)
  .font('Times-Roman', 13)
  .moveDown()
  .text(lorem,{width: 412,align: 'justify',indent: 30,columns: 2,height: 300,ellipsis: true
  });

  doc.end();