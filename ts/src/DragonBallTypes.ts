// Typed models for the DragonBall SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Character {
  affiliation?: string
  deleted_at?: string
  description?: string
  gender?: string
  id?: number
  image?: string
  ki?: string
  max_ki?: string
  name?: string
  origin_planet?: Record<string, any>
  race?: string
  transformation?: any[]
}

export interface CharacterLoadMatch {
  id: number
}

export interface CharacterListMatch {
  affiliation?: string
  deleted_at?: string
  description?: string
  gender?: string
  id?: number
  image?: string
  ki?: string
  max_ki?: string
  name?: string
  origin_planet?: Record<string, any>
  race?: string
  transformation?: any[]
}

export interface Planet {
  deleted_at?: string
  description?: string
  id?: number
  image?: string
  is_destroyed?: boolean
  name?: string
}

export interface PlanetLoadMatch {
  id: number
}

export interface PlanetListMatch {
  deleted_at?: string
  description?: string
  id?: number
  image?: string
  is_destroyed?: boolean
  name?: string
}

export interface Transformation {
  deleted_at?: string
  id?: number
  image?: string
  ki?: string
  name?: string
}

export interface TransformationLoadMatch {
  id: number
}

export interface TransformationListMatch {
  deleted_at?: string
  id?: number
  image?: string
  ki?: string
  name?: string
}

