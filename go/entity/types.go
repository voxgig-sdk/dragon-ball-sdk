// Typed models for the DragonBall SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Character is the typed data model for the character entity.
type Character struct {
	Affiliation *string `json:"affiliation,omitempty"`
	DeletedAt *string `json:"deleted_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Gender *string `json:"gender,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Ki *string `json:"ki,omitempty"`
	MaxKi *string `json:"max_ki,omitempty"`
	Name *string `json:"name,omitempty"`
	OriginPlanet *map[string]any `json:"origin_planet,omitempty"`
	Race *string `json:"race,omitempty"`
	Transformation *[]any `json:"transformation,omitempty"`
}

// CharacterLoadMatch is the typed request payload for Character.LoadTyped.
type CharacterLoadMatch struct {
	Id int `json:"id"`
}

// CharacterListMatch mirrors the character fields as an all-optional match
// filter (Go analog of Partial<Character>).
type CharacterListMatch struct {
	Affiliation *string `json:"affiliation,omitempty"`
	DeletedAt *string `json:"deleted_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Gender *string `json:"gender,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Ki *string `json:"ki,omitempty"`
	MaxKi *string `json:"max_ki,omitempty"`
	Name *string `json:"name,omitempty"`
	OriginPlanet *map[string]any `json:"origin_planet,omitempty"`
	Race *string `json:"race,omitempty"`
	Transformation *[]any `json:"transformation,omitempty"`
}

// Planet is the typed data model for the planet entity.
type Planet struct {
	DeletedAt *string `json:"deleted_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	IsDestroyed *bool `json:"is_destroyed,omitempty"`
	Name *string `json:"name,omitempty"`
}

// PlanetLoadMatch is the typed request payload for Planet.LoadTyped.
type PlanetLoadMatch struct {
	Id int `json:"id"`
}

// PlanetListMatch mirrors the planet fields as an all-optional match
// filter (Go analog of Partial<Planet>).
type PlanetListMatch struct {
	DeletedAt *string `json:"deleted_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	IsDestroyed *bool `json:"is_destroyed,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Transformation is the typed data model for the transformation entity.
type Transformation struct {
	DeletedAt *string `json:"deleted_at,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Ki *string `json:"ki,omitempty"`
	Name *string `json:"name,omitempty"`
}

// TransformationLoadMatch is the typed request payload for Transformation.LoadTyped.
type TransformationLoadMatch struct {
	Id int `json:"id"`
}

// TransformationListMatch mirrors the transformation fields as an all-optional match
// filter (Go analog of Partial<Transformation>).
type TransformationListMatch struct {
	DeletedAt *string `json:"deleted_at,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Ki *string `json:"ki,omitempty"`
	Name *string `json:"name,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
