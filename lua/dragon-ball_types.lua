-- Typed models for the DragonBall SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Character
---@field affiliation? string
---@field deletedAt? string
---@field description? string
---@field gender? string
---@field id? number
---@field image? string
---@field ki? string
---@field maxKi? string
---@field name? string
---@field originPlanet? table
---@field race? string
---@field transformations? table

---@class CharacterLoadMatch
---@field id number

---@class CharacterListMatch
---@field affiliation? string
---@field limit? number
---@field name? string
---@field page? number
---@field race? string

---@class Planet
---@field deletedAt? string
---@field description? string
---@field id? number
---@field image? string
---@field isDestroyed? boolean
---@field name? string

---@class PlanetLoadMatch
---@field id number

---@class PlanetListMatch
---@field limit? number
---@field name? string
---@field page? number

---@class Transformation
---@field deletedAt? string
---@field id? number
---@field image? string
---@field ki? string
---@field name? string

---@class TransformationLoadMatch
---@field id number

---@class TransformationListMatch
---@field limit? number
---@field page? number

local M = {}

return M
