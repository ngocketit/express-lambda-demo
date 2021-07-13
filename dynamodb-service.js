const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

const dbClient = new AWS.DynamoDB.DocumentClient()
const TABLE = process.env.DYNAMODB_TABLE

class Service {
  async getAll() {
    let results = []
    const params = {
      TableName: TABLE,
    }
    let items
    do {
      items = await dbClient.scan(params).promise()
      items.Items.forEach((item) => results.push(item))
      params.ExclusiveStartKey = items.LastEvaluatedKey
    } while (typeof items.LastEvaluatedKey != 'undefined')

    return results
  }

  async get(id) {
    return await dbClient.get({
      TableName: TABLE,
      Key: {
        'id': id,
      },
    }).promise()
  }

  async add(course) {
    course.id = uuidv4()
    await dbClient.put({
      TableName: TABLE,
      Item: course,
    }).promise()
    return course
  }

  async update(course) {
    return await dbClient.update({
      TableName:TABLE,
      Key: {
        'id': course.id,
      },
      UpdateExpression: 'SET #name = :name, startDate = :startDate, endDate = :endDate',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': course.name,
        ':startDate': course.startDate,
        ':endDate': course.endDate,
      },
      ReturnValues: 'UPDATED_NEW',
    }).promise()
  }

  async delete(id) {
    return await dbClient.delete({
      TableName: TABLE,
      Key: {
        'id': id,
      },
    }).promise()
  }
}

module.exports = Service
