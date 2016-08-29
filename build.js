var fs = require('fs');

var nunjucks = require('nunjucks');
var markdown = require('marked');
var moment = require('moment');

var packageFile = require('./package.json');


nunjucks.configure('views', { autoescape: true });

var README = markdown(fs.readFileSync('README.md', 'utf-8'));
fs.writeFileSync('./views/body.html', README);


var rendered = nunjucks.render('index.tpl', {
  title: 'Toast2.js',
  moment: moment,
  app: packageFile
});

fs.writeFileSync('index.html', rendered);

fs.writeFileSync('./dist/toast.js', fs.readFileSync('./src/toast.js', 'utf-8'));
