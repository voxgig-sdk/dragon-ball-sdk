package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCharacterEntityFunc func(client *DragonBallSDK, entopts map[string]any) DragonBallEntity

var NewPlanetEntityFunc func(client *DragonBallSDK, entopts map[string]any) DragonBallEntity

var NewTransformationEntityFunc func(client *DragonBallSDK, entopts map[string]any) DragonBallEntity

