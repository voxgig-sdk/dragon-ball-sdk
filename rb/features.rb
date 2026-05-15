# DragonBall SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module DragonBallFeatures
  def self.make_feature(name)
    case name
    when "base"
      DragonBallBaseFeature.new
    when "test"
      DragonBallTestFeature.new
    else
      DragonBallBaseFeature.new
    end
  end
end
