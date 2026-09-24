
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DragonBallSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DragonBallSDK.test()
    equal(testsdk instanceof DragonBallSDK, true,
      'DragonBallSDK.test() must return a client synchronously')
  })

})
