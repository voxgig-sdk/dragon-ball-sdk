# Typed models for the DragonBall SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Character(TypedDict, total=False):
    affiliation: str
    deleted_at: str
    description: str
    gender: str
    id: int
    image: str
    ki: str
    max_ki: str
    name: str
    origin_planet: dict
    race: str
    transformation: list


class CharacterLoadMatch(TypedDict):
    id: int


class CharacterListMatch(TypedDict, total=False):
    affiliation: str
    deleted_at: str
    description: str
    gender: str
    id: int
    image: str
    ki: str
    max_ki: str
    name: str
    origin_planet: dict
    race: str
    transformation: list


class Planet(TypedDict, total=False):
    deleted_at: str
    description: str
    id: int
    image: str
    is_destroyed: bool
    name: str


class PlanetLoadMatch(TypedDict):
    id: int


class PlanetListMatch(TypedDict, total=False):
    deleted_at: str
    description: str
    id: int
    image: str
    is_destroyed: bool
    name: str


class Transformation(TypedDict, total=False):
    deleted_at: str
    id: int
    image: str
    ki: str
    name: str


class TransformationLoadMatch(TypedDict):
    id: int


class TransformationListMatch(TypedDict, total=False):
    deleted_at: str
    id: int
    image: str
    ki: str
    name: str
