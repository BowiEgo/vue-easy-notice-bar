var fs = require('fs'),
  markdown = require('markdown'),
  fileContent

fileContent = fs.readFileSync('code-example.md', 'utf8')
fileContent = markdown.toHTML(fileContent)

fs.writeFileSync('code-example.html', fileContent)
