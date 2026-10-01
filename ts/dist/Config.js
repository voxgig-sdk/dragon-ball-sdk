"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'DragonBall',
        slug: "dragon-ball",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://dragonball-api.com/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            character: {},
            planet: {},
            transformation: {},
        }
    };
    entity = {
        "character": {
            "fields": [
                {
                    "name": "affiliation",
                    "title": "Affiliation",
                    "type": "`$STRING`",
                    "short": "Character's affiliation or allegiance"
                },
                {
                    "name": "deletedAt",
                    "title": "Deleted At",
                    "type": "`$STRING`",
                    "short": "Deletion timestamp if character is deleted",
                    "format": "date-time"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Detailed description of the character"
                },
                {
                    "name": "gender",
                    "title": "Gender",
                    "type": "`$STRING`",
                    "short": "Gender of the character"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "short": "Unique identifier for the character"
                },
                {
                    "name": "image",
                    "title": "Image",
                    "type": "`$STRING`",
                    "short": "URL to character image",
                    "format": "uri"
                },
                {
                    "name": "ki",
                    "title": "Ki",
                    "type": "`$STRING`",
                    "short": "Current ki (power level) of the character"
                },
                {
                    "name": "maxKi",
                    "title": "Max Ki",
                    "type": "`$STRING`",
                    "short": "Maximum ki the character can achieve"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Name of the character"
                },
                {
                    "name": "originPlanet",
                    "title": "Origin Planet",
                    "type": "`$OBJECT`",
                    "short": "Planet where the character originated"
                },
                {
                    "name": "race",
                    "title": "Race",
                    "type": "`$STRING`",
                    "short": "Race or species of the character"
                },
                {
                    "name": "transformations",
                    "title": "Transformations",
                    "type": "`$ARRAY`",
                    "short": "List of transformations available to the character"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "character",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/characters",
                            "segments": [
                                {
                                    "lit": "characters"
                                }
                            ],
                            "parts": [
                                "characters"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "affiliation",
                                        "orig": "affiliation",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "race",
                                        "orig": "race",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "affiliation",
                                    "limit",
                                    "name",
                                    "page",
                                    "race"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/characters/{id}",
                            "segments": [
                                {
                                    "lit": "characters"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "characters",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "planet": {
            "fields": [
                {
                    "name": "deletedAt",
                    "title": "Deleted At",
                    "type": "`$STRING`",
                    "short": "Deletion timestamp if planet is deleted",
                    "format": "date-time"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Detailed description of the planet"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "short": "Unique identifier for the planet"
                },
                {
                    "name": "image",
                    "title": "Image",
                    "type": "`$STRING`",
                    "short": "URL to planet image",
                    "format": "uri"
                },
                {
                    "name": "isDestroyed",
                    "title": "Is Destroyed",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the planet has been destroyed"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Name of the planet"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "planet",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/planets",
                            "segments": [
                                {
                                    "lit": "planets"
                                }
                            ],
                            "parts": [
                                "planets"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "limit",
                                    "name",
                                    "page"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/planets/{id}",
                            "segments": [
                                {
                                    "lit": "planets"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "planets",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "transformation": {
            "fields": [
                {
                    "name": "deletedAt",
                    "title": "Deleted At",
                    "type": "`$STRING`",
                    "short": "Deletion timestamp if transformation is deleted",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "short": "Unique identifier for the transformation"
                },
                {
                    "name": "image",
                    "title": "Image",
                    "type": "`$STRING`",
                    "short": "URL to transformation image",
                    "format": "uri"
                },
                {
                    "name": "ki",
                    "title": "Ki",
                    "type": "`$STRING`",
                    "short": "Ki level in this transformation"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Name of the transformation"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "transformation",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/transformations",
                            "segments": [
                                {
                                    "lit": "transformations"
                                }
                            ],
                            "parts": [
                                "transformations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "limit",
                                    "page"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/transformations/{id}",
                            "segments": [
                                {
                                    "lit": "transformations"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "transformations",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map