<?php
declare(strict_types=1);

// DragonBall SDK base feature

class DragonBallBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(DragonBallContext $ctx, array $options): void {}
    public function PostConstruct(DragonBallContext $ctx): void {}
    public function PostConstructEntity(DragonBallContext $ctx): void {}
    public function SetData(DragonBallContext $ctx): void {}
    public function GetData(DragonBallContext $ctx): void {}
    public function GetMatch(DragonBallContext $ctx): void {}
    public function SetMatch(DragonBallContext $ctx): void {}
    public function PrePoint(DragonBallContext $ctx): void {}
    public function PreSpec(DragonBallContext $ctx): void {}
    public function PreRequest(DragonBallContext $ctx): void {}
    public function PreResponse(DragonBallContext $ctx): void {}
    public function PreResult(DragonBallContext $ctx): void {}
    public function PreDone(DragonBallContext $ctx): void {}
    public function PreUnexpected(DragonBallContext $ctx): void {}
}
