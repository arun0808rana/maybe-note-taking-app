const express = require('express')
const app = express()
const port = 3000
const { readFile } = require('fs');
const hljs = require('highlight.js');
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) { }
        }

        return ''; // use external default escaping
    }
});

app.use(express.static(`${__dirname}/public`));
md.use(require('markdown-it-container'), 'spoiler', {

    validate: function(params) {
      return params.trim().match(/^spoiler\s+(.*)$/);
    },
  
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
  
      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';
  
      } else {
        // closing tag
        return '</details>\n';
      }
    }
  });
  
app.get('/', (req, res) => {
    res.sendFile('public/index.html', {root: __dirname })
})

app.get('/markdown-parsed', (req, res) => {

      
      console.log(md.render('::: spoiler click me\n*content*\n:::\n'));

    readFile('./generic.md', 'utf8', (err, data) => {
        const result = md.render(data);
        res.send(result)
    });

})

app.get('/markdown-raw', (req, res) => {
    readFile('./generic.md', 'utf8', (err, data) => {
        res.send(data)
    });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

var fs = require('fs'),
    path = require('path')

function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
    }

    return info;
}
const wtf = dirTree(__dirname + '/vault');
let json = JSON.stringify(wtf);
fs.writeFile('myjsonfile.json', json, 'utf8', ()=>{});
// fs.writeFileSync('/temp.json', json);
console.log('wtf',wtf)

