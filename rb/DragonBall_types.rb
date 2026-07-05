# frozen_string_literal: true

# Typed models for the DragonBall SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Character entity data model.
#
# @!attribute [rw] affiliation
#   @return [String, nil]
#
# @!attribute [rw] deleted_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] gender
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] ki
#   @return [String, nil]
#
# @!attribute [rw] max_ki
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] origin_planet
#   @return [Hash, nil]
#
# @!attribute [rw] race
#   @return [String, nil]
#
# @!attribute [rw] transformation
#   @return [Array, nil]
Character = Struct.new(
  :affiliation,
  :deleted_at,
  :description,
  :gender,
  :id,
  :image,
  :ki,
  :max_ki,
  :name,
  :origin_planet,
  :race,
  :transformation,
  keyword_init: true
)

# Request payload for Character#load.
#
# @!attribute [rw] id
#   @return [Integer]
CharacterLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Character#list.
#
# @!attribute [rw] affiliation
#   @return [String, nil]
#
# @!attribute [rw] deleted_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] gender
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] ki
#   @return [String, nil]
#
# @!attribute [rw] max_ki
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] origin_planet
#   @return [Hash, nil]
#
# @!attribute [rw] race
#   @return [String, nil]
#
# @!attribute [rw] transformation
#   @return [Array, nil]
CharacterListMatch = Struct.new(
  :affiliation,
  :deleted_at,
  :description,
  :gender,
  :id,
  :image,
  :ki,
  :max_ki,
  :name,
  :origin_planet,
  :race,
  :transformation,
  keyword_init: true
)

# Planet entity data model.
#
# @!attribute [rw] deleted_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] is_destroyed
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Planet = Struct.new(
  :deleted_at,
  :description,
  :id,
  :image,
  :is_destroyed,
  :name,
  keyword_init: true
)

# Request payload for Planet#load.
#
# @!attribute [rw] id
#   @return [Integer]
PlanetLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Planet#list.
#
# @!attribute [rw] deleted_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] is_destroyed
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
PlanetListMatch = Struct.new(
  :deleted_at,
  :description,
  :id,
  :image,
  :is_destroyed,
  :name,
  keyword_init: true
)

# Transformation entity data model.
#
# @!attribute [rw] deleted_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] ki
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Transformation = Struct.new(
  :deleted_at,
  :id,
  :image,
  :ki,
  :name,
  keyword_init: true
)

# Request payload for Transformation#load.
#
# @!attribute [rw] id
#   @return [Integer]
TransformationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Transformation#list.
#
# @!attribute [rw] deleted_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] ki
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
TransformationListMatch = Struct.new(
  :deleted_at,
  :id,
  :image,
  :ki,
  :name,
  keyword_init: true
)

