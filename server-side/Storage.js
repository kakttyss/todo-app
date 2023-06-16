const {
    readFileSync,
    writeFileSync,
} = require('node:fs')
class Storage {
    constructor(path) {
        this.path = path
        this.readFile()
    }
    readFile() {
        this.tasks = JSON.parse(readFileSync(this.path, 'utf-8'))
    }
    writeFile(tasks) {
        writeFileSync(this.path, JSON.stringify(tasks))
    }
}

module.exports = {
    Storage
}