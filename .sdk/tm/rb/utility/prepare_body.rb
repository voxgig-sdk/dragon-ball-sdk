# DragonBall SDK utility: prepare_body
require_relative 'media'
module DragonBallUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return DragonBallUtilities.raw_body(ctx.reqdata) if DragonBallUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
