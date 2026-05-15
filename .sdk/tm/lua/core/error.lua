-- DragonBall SDK error

local DragonBallError = {}
DragonBallError.__index = DragonBallError


function DragonBallError.new(code, msg, ctx)
  local self = setmetatable({}, DragonBallError)
  self.is_sdk_error = true
  self.sdk = "DragonBall"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function DragonBallError:error()
  return self.msg
end


function DragonBallError:__tostring()
  return self.msg
end


return DragonBallError
