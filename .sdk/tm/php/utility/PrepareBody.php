<?php
declare(strict_types=1);

// DragonBall SDK utility: prepare_body

class DragonBallPrepareBody
{
    public static function call(DragonBallContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
