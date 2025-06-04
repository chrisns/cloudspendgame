import { scoreboard } from '../scoreboard'
import { APIGatewayProxyEventV2, Context } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import sinon from 'sinon'
import { strict as assert } from 'assert'

describe('scoreboard sorting', () => {
  let scanStub: sinon.SinonStub

  before(() => {
    scanStub = sinon.stub(AWS.DynamoDB.DocumentClient.prototype, 'scan').returns({
      promise: () =>
        Promise.resolve({
          Items: [
            { handle: 'a', score: 3 },
            { handle: 'b', score: 5 },
            { handle: 'c', score: 1 },
            { handle: 'b', score: 5 },
            { handle: 'd', score: -1 }
          ]
        })
    } as any)
  })

  after(() => {
    scanStub.restore()
  })

  it('returns scores sorted descending', async () => {
    process.env.SCORE_TABLE = 'dummy'
    const result = await scoreboard({} as APIGatewayProxyEventV2, {} as Context)
    const body = JSON.parse((result as any).body)
    const scores = body.map((i: any) => i.score)
    assert.deepEqual(scores, [5, 3, 1])
  })
})
