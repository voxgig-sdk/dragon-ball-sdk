
import { Context } from './Context'


class DragonBallError extends Error {

  isDragonBallError = true

  sdk = 'DragonBall'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  DragonBallError
}

