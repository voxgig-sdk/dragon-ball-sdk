package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/dragon-ball-sdk/go"
	"github.com/voxgig-sdk/dragon-ball-sdk/go/core"

	vs "github.com/voxgig-sdk/dragon-ball-sdk/go/utility/struct"
)

func TestTransformationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Transformation(nil)
		if ent == nil {
			t.Fatal("expected non-nil TransformationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := transformationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "transformation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set DRAGONBALL_TEST_TRANSFORMATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		transformationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.transformation", setup.data)))
		var transformationRef01Data map[string]any
		if len(transformationRef01DataRaw) > 0 {
			transformationRef01Data = core.ToMapAny(transformationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = transformationRef01Data

		// LIST
		transformationRef01Ent := client.Transformation(nil)
		transformationRef01Match := map[string]any{}

		transformationRef01ListResult, err := transformationRef01Ent.List(transformationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, transformationRef01ListOk := transformationRef01ListResult.([]any)
		if !transformationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", transformationRef01ListResult)
		}

		// LOAD
		transformationRef01MatchDt0 := map[string]any{
			"id": transformationRef01Data["id"],
		}
		transformationRef01DataDt0Loaded, err := transformationRef01Ent.Load(transformationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		transformationRef01DataDt0LoadResult := core.ToMapAny(transformationRef01DataDt0Loaded)
		if transformationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if transformationRef01DataDt0LoadResult["id"] != transformationRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func transformationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "transformation", "TransformationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read transformation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse transformation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"transformation01", "transformation02", "transformation03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("DRAGONBALL_TEST_TRANSFORMATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"DRAGONBALL_TEST_TRANSFORMATION_ENTID": idmap,
		"DRAGONBALL_TEST_LIVE":      "FALSE",
		"DRAGONBALL_TEST_EXPLAIN":   "FALSE",
		"DRAGONBALL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["DRAGONBALL_TEST_TRANSFORMATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["DRAGONBALL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["DRAGONBALL_APIKEY"],
			},
			extra,
		})
		client = sdk.NewDragonBallSDK(core.ToMapAny(mergedOpts))
	}

	live := env["DRAGONBALL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["DRAGONBALL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
