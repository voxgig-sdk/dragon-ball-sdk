// Typed models for the DragonBall SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/dragon-ball-sdk/go/core"
)

// Character is the typed data model for the character entity.
type Character struct {
	Affiliation *string `json:"affiliation,omitempty"`
	DeletedAt *string `json:"deletedAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Gender *string `json:"gender,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Ki *string `json:"ki,omitempty"`
	MaxKi *string `json:"maxKi,omitempty"`
	Name *string `json:"name,omitempty"`
	OriginPlanet *map[string]any `json:"originPlanet,omitempty"`
	Race *string `json:"race,omitempty"`
	Transformations *[]any `json:"transformations,omitempty"`
}

// CharacterLoadMatch is the typed request payload for Character.LoadTyped.
type CharacterLoadMatch struct {
	Id int `json:"id"`
}

// CharacterListMatch is the typed request payload for Character.ListTyped.
type CharacterListMatch struct {
	Affiliation *string `json:"affiliation,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Name *string `json:"name,omitempty"`
	Page *int `json:"page,omitempty"`
	Race *string `json:"race,omitempty"`
}

// Planet is the typed data model for the planet entity.
type Planet struct {
	DeletedAt *string `json:"deletedAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	IsDestroyed *bool `json:"isDestroyed,omitempty"`
	Name *string `json:"name,omitempty"`
}

// PlanetLoadMatch is the typed request payload for Planet.LoadTyped.
type PlanetLoadMatch struct {
	Id int `json:"id"`
}

// PlanetListMatch is the typed request payload for Planet.ListTyped.
type PlanetListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Name *string `json:"name,omitempty"`
	Page *int `json:"page,omitempty"`
}

// Transformation is the typed data model for the transformation entity.
type Transformation struct {
	DeletedAt *string `json:"deletedAt,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Ki *string `json:"ki,omitempty"`
	Name *string `json:"name,omitempty"`
}

// TransformationLoadMatch is the typed request payload for Transformation.LoadTyped.
type TransformationLoadMatch struct {
	Id int `json:"id"`
}

// TransformationListMatch is the typed request payload for Transformation.ListTyped.
type TransformationListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Page *int `json:"page,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
