const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Storage } = require('./Storage.js')
const { TaskTracker } = require('./TaskTracker.js')

const storage = new Storage ('tasks.json')
const tasksTracker = new TaskTracker (storage.tasks)

const app = express()
app.use(cors())
app.use(bodyParser.json({ type: 'application/*+json' }))

app.get('', function (req, res) {
    
    res.send(tasksTracker.exec('list'))
})

app.post('/tasks', (req, res) => {
    const { task } = req.query
    
    tasksTracker.exec('add', task)
    storage.writeFile(tasksTracker.tasks)

    res.send(tasksTracker.exec('list'))
})

app.delete('/tasks', (req, res) => {
    const id = req.query.id

    tasksTracker.exec('done', id)
    storage.writeFile(tasksTracker.tasks)

    res.send(tasksTracker.exec('list'))
})

app.listen(3000)
console.log('Listening 3000...')