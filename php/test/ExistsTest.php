<?php
declare(strict_types=1);

// DragonBall SDK exists test

require_once __DIR__ . '/../dragonball_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = DragonBallSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
