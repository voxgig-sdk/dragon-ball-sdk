-- Typed models for the DragonBall SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Character
---@field affiliation? string
---@field deleted_at? string
---@field description? string
---@field gender? string
---@field id? number
---@field image? string
---@field ki? string
---@field max_ki? string
---@field name? string
---@field origin_planet? table
---@field race? string
---@field transformation? table

---@class CharacterLoadMatch
---@field id number

---@class CharacterListMatch
---@field affiliation? string
---@field deleted_at? string
---@field description? string
---@field gender? string
---@field id? number
---@field image? string
---@field ki? string
---@field max_ki? string
---@field name? string
---@field origin_planet? table
---@field race? string
---@field transformation? table

---@class Planet
---@field deleted_at? string
---@field description? string
---@field id? number
---@field image? string
---@field is_destroyed? boolean
---@field name? string

---@class PlanetLoadMatch
---@field id number

---@class PlanetListMatch
---@field deleted_at? string
---@field description? string
---@field id? number
---@field image? string
---@field is_destroyed? boolean
---@field name? string

---@class Transformation
---@field deleted_at? string
---@field id? number
---@field image? string
---@field ki? string
---@field name? string

---@class TransformationLoadMatch
---@field id number

---@class TransformationListMatch
---@field deleted_at? string
---@field id? number
---@field image? string
---@field ki? string
---@field name? string

local M = {}

return M
