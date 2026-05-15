# DragonBall SDK exists test

require "minitest/autorun"
require_relative "../DragonBall_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = DragonBallSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
