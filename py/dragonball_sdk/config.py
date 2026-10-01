# DragonBall SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "DragonBall",
            "slug": "dragon-ball",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://dragonball-api.com/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "character": {},
                "planet": {},
                "transformation": {},
            },
        },
        "entity": {
      "character": {
        "fields": [
          {
            "name": "affiliation",
            "title": "Affiliation",
            "type": "`$STRING`",
            "short": "Character's affiliation or allegiance",
          },
          {
            "name": "deletedAt",
            "title": "Deleted At",
            "type": "`$STRING`",
            "short": "Deletion timestamp if character is deleted",
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Detailed description of the character",
          },
          {
            "name": "gender",
            "title": "Gender",
            "type": "`$STRING`",
            "short": "Gender of the character",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Unique identifier for the character",
          },
          {
            "name": "image",
            "title": "Image",
            "type": "`$STRING`",
            "short": "URL to character image",
            "format": "uri",
          },
          {
            "name": "ki",
            "title": "Ki",
            "type": "`$STRING`",
            "short": "Current ki (power level) of the character",
          },
          {
            "name": "maxKi",
            "title": "Max Ki",
            "type": "`$STRING`",
            "short": "Maximum ki the character can achieve",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the character",
          },
          {
            "name": "originPlanet",
            "title": "Origin Planet",
            "type": "`$OBJECT`",
            "short": "Planet where the character originated",
          },
          {
            "name": "race",
            "title": "Race",
            "type": "`$STRING`",
            "short": "Race or species of the character",
          },
          {
            "name": "transformations",
            "title": "Transformations",
            "type": "`$ARRAY`",
            "short": "List of transformations available to the character",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "characters",
                  },
                ],
                "parts": [
                  "characters",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "affiliation",
                      "orig": "affiliation",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "race",
                      "orig": "race",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "affiliation",
                    "limit",
                    "name",
                    "page",
                    "race",
                  ],
                },
              },
            ],
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
                    "lit": "characters",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "characters",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "planet": {
        "fields": [
          {
            "name": "deletedAt",
            "title": "Deleted At",
            "type": "`$STRING`",
            "short": "Deletion timestamp if planet is deleted",
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Detailed description of the planet",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Unique identifier for the planet",
          },
          {
            "name": "image",
            "title": "Image",
            "type": "`$STRING`",
            "short": "URL to planet image",
            "format": "uri",
          },
          {
            "name": "isDestroyed",
            "title": "Is Destroyed",
            "type": "`$BOOLEAN`",
            "short": "Whether the planet has been destroyed",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the planet",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "planets",
                  },
                ],
                "parts": [
                  "planets",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "limit",
                    "name",
                    "page",
                  ],
                },
              },
            ],
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
                    "lit": "planets",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "planets",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "transformation": {
        "fields": [
          {
            "name": "deletedAt",
            "title": "Deleted At",
            "type": "`$STRING`",
            "short": "Deletion timestamp if transformation is deleted",
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Unique identifier for the transformation",
          },
          {
            "name": "image",
            "title": "Image",
            "type": "`$STRING`",
            "short": "URL to transformation image",
            "format": "uri",
          },
          {
            "name": "ki",
            "title": "Ki",
            "type": "`$STRING`",
            "short": "Ki level in this transformation",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the transformation",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "transformations",
                  },
                ],
                "parts": [
                  "transformations",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "limit",
                    "page",
                  ],
                },
              },
            ],
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
                    "lit": "transformations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "transformations",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
