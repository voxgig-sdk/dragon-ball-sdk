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
    public ?string $deleted_at = null;
    public ?string $description = null;
    public ?string $gender = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?string $ki = null;
    public ?string $max_ki = null;
    public ?string $name = null;
    public ?array $origin_planet = null;
    public ?string $race = null;
    public ?array $transformation = null;
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
    public ?string $deleted_at = null;
    public ?string $description = null;
    public ?string $gender = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?string $ki = null;
    public ?string $max_ki = null;
    public ?string $name = null;
    public ?array $origin_planet = null;
    public ?string $race = null;
    public ?array $transformation = null;
}

/** Planet entity data model. */
class Planet
{
    public ?string $deleted_at = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?bool $is_destroyed = null;
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
    public ?string $deleted_at = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?bool $is_destroyed = null;
    public ?string $name = null;
}

/** Transformation entity data model. */
class Transformation
{
    public ?string $deleted_at = null;
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
    public ?string $deleted_at = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?string $ki = null;
    public ?string $name = null;
}

