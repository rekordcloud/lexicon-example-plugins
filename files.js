let currentTime = new Date().toLocaleTimeString()

const filename = `The Time.txt`

_files.write(filename, 'It is currently: ' + currentTime)

const fileList = _files.list()

// Check if file exists in fileList and report existence
const fileExists = fileList.includes(filename)
const fileContents = _files.read(filename)

_helpers.Report(`Wrote ${filename} to the plugin's "Files" folder. Does ${filename} exist? ${fileExists}. It contains: ${fileContents}`)
