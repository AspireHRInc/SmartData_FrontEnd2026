const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/smart-suite'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/smart-suite/index.html'));
});

app.listen(process.env.PORT || 8080);

console.log('building')



