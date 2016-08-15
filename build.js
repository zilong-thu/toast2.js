var fs = require('fs');

var nunjucks = require('nunjucks');
var markdown = require('marked');
var moment = require('moment');


nunjucks.configure('views', { autoescape: true });

var README = markdown(fs.readFileSync('README.md', 'utf-8'));
fs.writeFileSync('./views/body.html', README);


var rendered = nunjucks.render('index.tpl', {
  title: 'Toast.js',
  moment: moment
});

fs.writeFileSync('index.html', rendered);