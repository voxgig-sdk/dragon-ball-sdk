// Typed models for the DragonBall SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Character {
  affiliation?: string
  deletedAt?: string
  description?: string
  gender?: string
  id?: number
  image?: string
  ki?: string
  maxKi?: string
  name?: string
  originPlanet?: Record<string, any>
  race?: string
  transformations?: any[]
}

export interface CharacterLoadMatch {
  id: number
}

export interface CharacterListMatch {
  affiliation?: string
  limit?: number
  name?: string
  page?: number
  race?: string
}

export interface Planet {
  deletedAt?: string
  description?: string
  id?: number
  image?: string
  isDestroyed?: boolean
  name?: string
}

export interface PlanetLoadMatch {
  id: number
}

export interface PlanetListMatch {
  limit?: number
  name?: string
  page?: number
}

export interface Transformation {
  deletedAt?: string
  id?: number
  image?: string
  ki?: string
  name?: string
}

export interface TransformationLoadMatch {
  id: number
}

export interface TransformationListMatch {
  limit?: number
  page?: number
}

