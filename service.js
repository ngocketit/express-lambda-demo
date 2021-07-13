const { v4: uuidv4 } = require('uuid')

const courses = []

class Service {
  async getAll() {
    return courses
  }

  async get(id) {
    return courses.find(course => course.id === id)
  }

  async add(course) {
    course.id = uuidv4()
    courses.push(course)
    return course
  }

  async update(id, changes) {
    const index = courses.findIndex(course => course.id === id)
    if (index >= 0) {
      courses[index] = {...courses[index], ...changes}
      return courses[index]
    }
    return false
  }

  async delete(id) {
    const index = courses.findIndex(course => course.id === id)
    if (index >= 0) {
      courses.splice(index, 1)
      return true
    }
    return false
  }
}

module.exports = Service
