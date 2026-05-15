# DragonBall SDK utility: feature_add
module DragonBallUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
