<?php
declare(strict_types=1);

// Transformation entity test

require_once __DIR__ . '/../dragonball_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class TransformationEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = DragonBallSDK::test(null, null);
        $ent = $testsdk->Transformation(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = transformation_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "transformation." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set DRAGONBALL_TEST_TRANSFORMATION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $transformation_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.transformation")));
        $transformation_ref01_data = null;
        if (count($transformation_ref01_data_raw) > 0) {
            $transformation_ref01_data = Helpers::to_map($transformation_ref01_data_raw[0][1]);
        }

        // LIST
        $transformation_ref01_ent = $client->Transformation(null);
        $transformation_ref01_match = [];

        [$transformation_ref01_list_result, $err] = $transformation_ref01_ent->list($transformation_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($transformation_ref01_list_result);

        // LOAD
        $transformation_ref01_match_dt0 = [
            "id" => $transformation_ref01_data["id"],
        ];
        [$transformation_ref01_data_dt0_loaded, $err] = $transformation_ref01_ent->load($transformation_ref01_match_dt0, null);
        $this->assertNull($err);
        $transformation_ref01_data_dt0_load_result = Helpers::to_map($transformation_ref01_data_dt0_loaded);
        $this->assertNotNull($transformation_ref01_data_dt0_load_result);
        $this->assertEquals($transformation_ref01_data_dt0_load_result["id"], $transformation_ref01_data["id"]);

    }
}

function transformation_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/transformation/TransformationTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = DragonBallSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["transformation01", "transformation02", "transformation03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("DRAGONBALL_TEST_TRANSFORMATION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "DRAGONBALL_TEST_TRANSFORMATION_ENTID" => $idmap,
        "DRAGONBALL_TEST_LIVE" => "FALSE",
        "DRAGONBALL_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["DRAGONBALL_TEST_TRANSFORMATION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["DRAGONBALL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new DragonBallSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["DRAGONBALL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["DRAGONBALL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
