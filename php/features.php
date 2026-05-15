<?php
declare(strict_types=1);

// DragonBall SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class DragonBallFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new DragonBallBaseFeature();
            case "test":
                return new DragonBallTestFeature();
            default:
                return new DragonBallBaseFeature();
        }
    }
}
