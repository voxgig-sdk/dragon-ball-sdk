package = "voxgig-sdk-dragon-ball"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/dragon-ball-sdk.git"
}
description = {
  summary = "DragonBall SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["dragon-ball_sdk"] = "dragon-ball_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
