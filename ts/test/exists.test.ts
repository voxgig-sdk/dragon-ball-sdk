
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DragonBallSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await DragonBallSDK.test()
    equal(null !== testsdk, true)
  })

})
