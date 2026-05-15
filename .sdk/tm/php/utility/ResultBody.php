<?php
declare(strict_types=1);

// DragonBall SDK utility: result_body

class DragonBallResultBody
{
    public static function call(DragonBallContext $ctx): ?DragonBallResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
