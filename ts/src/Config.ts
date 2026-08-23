
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'DragonBall',
        slug: "dragon-ball",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://dragonball-api.com/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      character: {
      },

      planet: {
      },

      transformation: {
      },

    }
  }


  entity = {
    "character": {
      "fields": [
        {
          "name": "affiliation",
          "short": "Character's affiliation or allegiance",
          "type": "`$STRING`"
        },
        {
          "name": "deletedAt",
          "short": "Deletion timestamp if character is deleted",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Detailed description of the character",
          "type": "`$STRING`"
        },
        {
          "name": "gender",
          "short": "Gender of the character",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the character",
          "type": "`$INTEGER`"
        },
        {
          "name": "image",
          "short": "URL to character image",
          "type": "`$STRING`"
        },
        {
          "name": "ki",
          "short": "Current ki (power level) of the character",
          "type": "`$STRING`"
        },
        {
          "name": "maxKi",
          "short": "Maximum ki the character can achieve",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Name of the character",
          "type": "`$STRING`"
        },
        {
          "name": "originPlanet",
          "short": "Planet where the character originated",
          "type": "`$OBJECT`"
        },
        {
          "name": "race",
          "short": "Race or species of the character",
          "type": "`$STRING`"
        },
        {
          "name": "transformations",
          "short": "List of transformations available to the character",
          "type": "`$ARRAY`"
        }
      ],
      "name": "character",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "affiliation",
                    "orig": "affiliation",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "race",
                    "orig": "race",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/characters",
              "parts": [
                "characters"
              ],
              "select": {
                "exist": [
                  "affiliation",
                  "limit",
                  "name",
                  "page",
                  "race"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/characters/{id}",
              "parts": [
                "characters",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
          "short": "Deletion timestamp if planet is deleted",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Detailed description of the planet",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the planet",
          "type": "`$INTEGER`"
        },
        {
          "name": "image",
          "short": "URL to planet image",
          "type": "`$STRING`"
        },
        {
          "name": "isDestroyed",
          "short": "Whether the planet has been destroyed",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "name",
          "short": "Name of the planet",
          "type": "`$STRING`"
        }
      ],
      "name": "planet",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/planets",
              "parts": [
                "planets"
              ],
              "select": {
                "exist": [
                  "limit",
                  "name",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/planets/{id}",
              "parts": [
                "planets",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
          "short": "Deletion timestamp if transformation is deleted",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the transformation",
          "type": "`$INTEGER`"
        },
        {
          "name": "image",
          "short": "URL to transformation image",
          "type": "`$STRING`"
        },
        {
          "name": "ki",
          "short": "Ki level in this transformation",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Name of the transformation",
          "type": "`$STRING`"
        }
      ],
      "name": "transformation",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/transformations",
              "parts": [
                "transformations"
              ],
              "select": {
                "exist": [
                  "limit",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/transformations/{id}",
              "parts": [
                "transformations",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

