<?php
declare(strict_types=1);

// DragonBall SDK utility: result_headers

class DragonBallResultHeaders
{
    public static function call(DragonBallContext $ctx): ?DragonBallResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
