"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PlanetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DRAGON_BALL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DRAGON_BALL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DragonBallSDK.test();
        const ent = testsdk.Planet();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DRAGON_BALL_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'planet.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "deletedAt": { "a": true, "fo": "date-time", "h": "Deleted At", "n": "deletedAt", "r": false, "sh": "Deletion timestamp if planet is deleted", "t": "`$STRING`", "key$": "deletedAt", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Detailed description of the planet", "t": "`$STRING`", "key$": "description", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the planet", "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "image": { "a": true, "fo": "uri", "h": "Image", "n": "image", "r": false, "sh": "URL to planet image", "t": "`$STRING`", "key$": "image", "index$": 3 }, "isDestroyed": { "a": true, "h": "Is Destroyed", "n": "isDestroyed", "r": false, "sh": "Whether the planet has been destroyed", "t": "`$BOOLEAN`", "key$": "isDestroyed", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the planet", "t": "`$STRING`", "key$": "name", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "planet", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /planets", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "name", "or": "name", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/planets", "q": { "exist": ["limit", "name", "page"] }, "r": {}, "s": [{ "lit": "planets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /planets/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/planets/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "planets" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "planet", "name__orig": "planet", "Name": "Planet", "name_": "planet", "name-": "planet", "NAME": "PLANET", "index$": 1 }, { "active": true, "entity": "planet", "key$": "BasicPlanetFlow", "kind": "basic", "name": "BasicPlanetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "planet_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "planet_ref01", "srcdatavar": "planet_ref01_data", "suffix": "_dt0" }, "m": { "id": "planet01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-planet_ref01" } }], "index$": 1 }] }, 'Planet', { "GET /planets": { "protocol": "http", "operationId": "getPlanets", "responses": { "200": { "description": "Successful response with list of planets", "content": { "application/json": { "schema": { "type": "object", "properties": { "items": { "items": { "properties": { "deletedAt": { "description": "Deletion timestamp if planet is deleted", "format": "date-time", "nullable": true, "type": "string", "key$": "deletedAt" }, "description": { "description": "Detailed description of the planet", "type": "string", "key$": "description" }, "id": { "description": "Unique identifier for the planet", "type": "integer", "key$": "id" }, "image": { "description": "URL to planet image", "format": "uri", "type": "string", "key$": "image" }, "isDestroyed": { "description": "Whether the planet has been destroyed", "type": "boolean", "key$": "isDestroyed" }, "name": { "description": "Name of the planet", "type": "string", "key$": "name" } }, "type": "object", "x-ref": "#/components/schemas/Planet", "index$": 0 }, "key$": "items", "type": "array" }, "meta": { "key$": "meta", "properties": { "currentPage": { "description": "Current page number", "type": "integer" }, "itemCount": { "description": "Number of items in current response", "type": "integer" }, "itemsPerPage": { "description": "Number of items per page", "type": "integer" }, "totalItems": { "description": "Total number of items available", "type": "integer" }, "totalPages": { "description": "Total number of pages", "type": "integer" } }, "type": "object", "x-ref": "#/components/schemas/PaginationMeta" }, "links": { "key$": "links", "properties": { "first": { "description": "Link to first page", "format": "uri", "type": "string" }, "last": { "description": "Link to last page", "format": "uri", "type": "string" }, "next": { "description": "Link to next page", "format": "uri", "nullable": true, "type": "string" }, "previous": { "description": "Link to previous page", "format": "uri", "nullable": true, "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PaginationLinks" } } } } } }, "400": { "description": "Bad request - invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "statusCode": { "type": "integer", "description": "HTTP status code" }, "message": { "type": "string", "description": "Error message" }, "error": { "type": "string", "description": "Error type" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "statusCode": { "type": "integer", "description": "HTTP status code" }, "message": { "type": "string", "description": "Error message" }, "error": { "type": "string", "description": "Error type" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 0 }, { "name": "limit", "in": "query", "description": "Number of results per page", "required": false, "schema": { "type": "integer", "default": 10, "minimum": 1, "maximum": 100 }, "index$": 1 }, { "name": "name", "in": "query", "description": "Filter planets by name", "required": false, "schema": { "type": "string" }, "index$": 2 }], "securitySource": "unspecified" }, "GET /planets/{id}": { "protocol": "http", "operationId": "getPlanetById", "responses": { "200": { "description": "Successful response with planet details", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Unique identifier for the planet", "type": "integer", "key$": "id" }, "name": { "description": "Name of the planet", "type": "string", "key$": "name" }, "isDestroyed": { "description": "Whether the planet has been destroyed", "type": "boolean", "key$": "isDestroyed" }, "description": { "description": "Detailed description of the planet", "type": "string", "key$": "description" }, "image": { "description": "URL to planet image", "format": "uri", "type": "string", "key$": "image" }, "deletedAt": { "description": "Deletion timestamp if planet is deleted", "format": "date-time", "nullable": true, "type": "string", "key$": "deletedAt" } }, "x-ref": "#/components/schemas/Planet", "index$": 0 } } } }, "404": { "description": "Planet not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "statusCode": { "type": "integer", "description": "HTTP status code" }, "message": { "type": "string", "description": "Error message" }, "error": { "type": "string", "description": "Error type" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "statusCode": { "type": "integer", "description": "HTTP status code" }, "message": { "type": "string", "description": "Error message" }, "error": { "type": "string", "description": "Error type" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Unique identifier of the planet", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let planet_ref01_data = Object.values(setup.data.existing.planet)[0];
        // LIST
        const planet_ref01_ent = client.Planet();
        const planet_ref01_match = {};
        const planet_ref01_list = (await planet_ref01_ent.list(planet_ref01_match)).map((e) => e.data());
        // LOAD
        const planet_ref01_match_dt0 = {};
        planet_ref01_match_dt0.id = planet_ref01_data.id;
        const planet_ref01_data_dt0 = (await planet_ref01_ent.load(planet_ref01_match_dt0)).data();
        (0, node_assert_1.default)(planet_ref01_data_dt0.id === planet_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/planet/PlanetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DragonBallSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['planet01', 'planet02', 'planet03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DRAGON_BALL_TEST_PLANET_ENTID': idmap,
        'DRAGON_BALL_TEST_LIVE': 'FALSE',
        'DRAGON_BALL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DRAGON_BALL_TEST_PLANET_ENTID'];
    const live = 'TRUE' === env.DRAGON_BALL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DRAGON_BALL_TEST_PLANET_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DragonBallSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.DRAGON_BALL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PlanetEntity.test.js.map