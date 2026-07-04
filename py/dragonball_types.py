# Typed models for the DragonBall SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Character:
    affiliation: Optional[str] = None
    deleted_at: Optional[str] = None
    description: Optional[str] = None
    gender: Optional[str] = None
    id: Optional[int] = None
    image: Optional[str] = None
    ki: Optional[str] = None
    max_ki: Optional[str] = None
    name: Optional[str] = None
    origin_planet: Optional[dict] = None
    race: Optional[str] = None
    transformation: Optional[list] = None


@dataclass
class CharacterLoadMatch:
    id: int


@dataclass
class CharacterListMatch:
    affiliation: Optional[str] = None
    deleted_at: Optional[str] = None
    description: Optional[str] = None
    gender: Optional[str] = None
    id: Optional[int] = None
    image: Optional[str] = None
    ki: Optional[str] = None
    max_ki: Optional[str] = None
    name: Optional[str] = None
    origin_planet: Optional[dict] = None
    race: Optional[str] = None
    transformation: Optional[list] = None


@dataclass
class Planet:
    deleted_at: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    image: Optional[str] = None
    is_destroyed: Optional[bool] = None
    name: Optional[str] = None


@dataclass
class PlanetLoadMatch:
    id: int


@dataclass
class PlanetListMatch:
    deleted_at: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    image: Optional[str] = None
    is_destroyed: Optional[bool] = None
    name: Optional[str] = None


@dataclass
class Transformation:
    deleted_at: Optional[str] = None
    id: Optional[int] = None
    image: Optional[str] = None
    ki: Optional[str] = None
    name: Optional[str] = None


@dataclass
class TransformationLoadMatch:
    id: int


@dataclass
class TransformationListMatch:
    deleted_at: Optional[str] = None
    id: Optional[int] = None
    image: Optional[str] = None
    ki: Optional[str] = None
    name: Optional[str] = None

