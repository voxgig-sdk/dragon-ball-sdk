# DragonBall SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module DragonBallFeatures
  def self.make_feature(name)
    case name
    when "base"
      DragonBallBaseFeature.new
    when "ratelimit"
      DragonBallRatelimitFeature.new
    when "retry"
      DragonBallRetryFeature.new
    when "test"
      DragonBallTestFeature.new
    when "timeout"
      DragonBallTimeoutFeature.new
    else
      DragonBallBaseFeature.new
    end
  end
end
