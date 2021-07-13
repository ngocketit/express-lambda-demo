const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const CourseService = require('./service')

const service = new CourseService()

app.use(bodyParser.json())

app.get('/courses', async (_req, res) => {
  res.send(await service.getAll())
})

app.post('/courses', async (req, res) => {
  res.send(await service.add(req.body))
})

app.get('/courses/:id', async (req, res) => {
  const course = await service.get(req.params.id)
  if (course) {
    res.send(course)
  } else {
    res.status(404).send({
      message: 'Not found',
    })
  }
})

app.delete('/courses/:id', async (req, res) => {
  const deleted = await service.delete(req.params.id)
  if (deleted) {
    res.send({
      message: 'Success',
    })
  } else {
    res.status(404).send({
      message: 'Not found',
    })
  }
})

app.put('/courses/:id', async (req, res) => {
  const updated = await service.update(req.params.id, req.body)
  if (updated) {
    res.send(updated)
  } else {
    res.status(404).send({
      message: 'Not found',
    })
  }
})

module.exports = app
