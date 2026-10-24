import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "character",
    "accessor": "Character",
    "op": "list",
    "method": "GET",
    "path": "/characters",
    "args": [],
    "select": {
      "affiliation": "v1",
      "limit": 10,
      "name": "v1",
      "page": 1,
      "race": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "limit",
      "name",
      "race",
      "affiliation"
    ],
    "queryArgs": [
      {
        "name": "affiliation",
        "wire": "affiliation"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "name",
        "wire": "name"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "race",
        "wire": "race"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "id": 1,
          "name": "x",
          "ki": "x",
          "maxKi": "x",
          "race": "x",
          "gender": "Male",
          "description": "x",
          "image": "x",
          "affiliation": "x",
          "deletedAt": "2026-01-01T00:00:00Z",
          "transformations": [
            {
              "id": 1,
              "name": "x",
              "image": "x",
              "ki": "x",
              "deletedAt": "2026-01-01T00:00:00Z"
            }
          ],
          "originPlanet": {
            "id": 1,
            "name": "x",
            "isDestroyed": true,
            "description": "x",
            "image": "x",
            "deletedAt": "2026-01-01T00:00:00Z"
          }
        }
      ],
      "meta": {
        "totalItems": 1,
        "itemCount": 1,
        "itemsPerPage": 1,
        "totalPages": 1,
        "currentPage": 1
      },
      "links": {
        "first": "x",
        "previous": "x",
        "next": "x",
        "last": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "character",
    "accessor": "Character",
    "op": "load",
    "method": "GET",
    "path": "/characters/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "ki": "x",
      "maxKi": "x",
      "race": "x",
      "gender": "Male",
      "description": "x",
      "image": "x",
      "affiliation": "x",
      "deletedAt": "2026-01-01T00:00:00Z",
      "transformations": [
        {
          "id": 1,
          "name": "x",
          "image": "x",
          "ki": "x",
          "deletedAt": "2026-01-01T00:00:00Z"
        }
      ],
      "originPlanet": {
        "id": 1,
        "name": "x",
        "isDestroyed": true,
        "description": "x",
        "image": "x",
        "deletedAt": "2026-01-01T00:00:00Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "planet",
    "accessor": "Planet",
    "op": "list",
    "method": "GET",
    "path": "/planets",
    "args": [],
    "select": {
      "limit": 10,
      "name": "v1",
      "page": 1
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "limit",
      "name"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "name",
        "wire": "name"
      },
      {
        "name": "page",
        "wire": "page"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "id": 1,
          "name": "x",
          "isDestroyed": true,
          "description": "x",
          "image": "x",
          "deletedAt": "2026-01-01T00:00:00Z"
        }
      ],
      "meta": {
        "totalItems": 1,
        "itemCount": 1,
        "itemsPerPage": 1,
        "totalPages": 1,
        "currentPage": 1
      },
      "links": {
        "first": "x",
        "previous": "x",
        "next": "x",
        "last": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "planet",
    "accessor": "Planet",
    "op": "load",
    "method": "GET",
    "path": "/planets/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "isDestroyed": true,
      "description": "x",
      "image": "x",
      "deletedAt": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "transformation",
    "accessor": "Transformation",
    "op": "list",
    "method": "GET",
    "path": "/transformations",
    "args": [],
    "select": {
      "limit": 10,
      "page": 1
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "page",
        "wire": "page"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "id": 1,
          "name": "x",
          "image": "x",
          "ki": "x",
          "deletedAt": "2026-01-01T00:00:00Z"
        }
      ],
      "meta": {
        "totalItems": 1,
        "itemCount": 1,
        "itemsPerPage": 1,
        "totalPages": 1,
        "currentPage": 1
      },
      "links": {
        "first": "x",
        "previous": "x",
        "next": "x",
        "last": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "transformation",
    "accessor": "Transformation",
    "op": "load",
    "method": "GET",
    "path": "/transformations/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "image": "x",
      "ki": "x",
      "deletedAt": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
