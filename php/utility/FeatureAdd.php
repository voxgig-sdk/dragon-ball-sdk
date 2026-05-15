<?php
declare(strict_types=1);

// DragonBall SDK utility: feature_add

class DragonBallFeatureAdd
{
    public static function call(DragonBallContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
