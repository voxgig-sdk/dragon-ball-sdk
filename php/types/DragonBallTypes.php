<?php
declare(strict_types=1);

// Typed models for the DragonBall SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Character entity data model. */
class Character
{
    public ?string $affiliation = null;
    public ?string $deletedAt = null;
    public ?string $description = null;
    public ?string $gender = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?string $ki = null;
    public ?string $maxKi = null;
    public ?string $name = null;
    public ?array $originPlanet = null;
    public ?string $race = null;
    public ?array $transformations = null;
}

/** Request payload for Character#load. */
class CharacterLoadMatch
{
    public int $id;
}

/** Request payload for Character#list. */
class CharacterListMatch
{
    public ?string $affiliation = null;
    public ?int $limit = null;
    public ?string $name = null;
    public ?int $page = null;
    public ?string $race = null;
}

/** Planet entity data model. */
class Planet
{
    public ?string $deletedAt = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?bool $isDestroyed = null;
    public ?string $name = null;
}

/** Request payload for Planet#load. */
class PlanetLoadMatch
{
    public int $id;
}

/** Request payload for Planet#list. */
class PlanetListMatch
{
    public ?int $limit = null;
    public ?string $name = null;
    public ?int $page = null;
}

/** Transformation entity data model. */
class Transformation
{
    public ?string $deletedAt = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?string $ki = null;
    public ?string $name = null;
}

/** Request payload for Transformation#load. */
class TransformationLoadMatch
{
    public int $id;
}

/** Request payload for Transformation#list. */
class TransformationListMatch
{
    public ?int $limit = null;
    public ?int $page = null;
}

