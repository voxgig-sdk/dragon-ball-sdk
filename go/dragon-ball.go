package voxgigdragonballsdk

import (
	"github.com/voxgig-sdk/dragon-ball-sdk/go/core"
	"github.com/voxgig-sdk/dragon-ball-sdk/go/entity"
	"github.com/voxgig-sdk/dragon-ball-sdk/go/feature"
	_ "github.com/voxgig-sdk/dragon-ball-sdk/go/utility"
)

// Type aliases preserve external API.
type DragonBallSDK = core.DragonBallSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type DragonBallEntity = core.DragonBallEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type DragonBallError = core.DragonBallError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCharacterEntityFunc = func(client *core.DragonBallSDK, entopts map[string]any) core.DragonBallEntity {
		return entity.NewCharacterEntity(client, entopts)
	}
	core.NewPlanetEntityFunc = func(client *core.DragonBallSDK, entopts map[string]any) core.DragonBallEntity {
		return entity.NewPlanetEntity(client, entopts)
	}
	core.NewTransformationEntityFunc = func(client *core.DragonBallSDK, entopts map[string]any) core.DragonBallEntity {
		return entity.NewTransformationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewDragonBallSDK = core.NewDragonBallSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewDragonBallSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *DragonBallSDK  { return NewDragonBallSDK(nil) }
func Test() *DragonBallSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
