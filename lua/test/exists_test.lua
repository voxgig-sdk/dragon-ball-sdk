-- DragonBall SDK exists test

local sdk = require("dragon-ball_sdk")

describe("DragonBallSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
