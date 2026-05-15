# DragonBall SDK utility: make_context
require_relative '../core/context'
module DragonBallUtilities
  MakeContext = ->(ctxmap, basectx) {
    DragonBallContext.new(ctxmap, basectx)
  }
end
