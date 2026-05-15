<?php
declare(strict_types=1);

// DragonBall SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class DragonBallMakeContext
{
    public static function call(array $ctxmap, ?DragonBallContext $basectx): DragonBallContext
    {
        return new DragonBallContext($ctxmap, $basectx);
    }
}
