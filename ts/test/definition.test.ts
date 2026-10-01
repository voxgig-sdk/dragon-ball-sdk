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
      "limit": "v1",
      "name": "v1",
      "page": "v1",
      "race": "v1"
    },
    "headers": [],
    "query": [
      "page",
      "limit",
      "name",
      "race",
      "affiliation"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "affiliation": "x",
          "deletedAt": "2026-01-01T00:00:00Z",
          "description": "x",
          "gender": "Male",
          "id": 1,
          "image": "x",
          "ki": "x",
          "maxKi": "x",
          "name": "x",
          "originPlanet": {
            "deletedAt": "2026-01-01T00:00:00Z",
            "description": "x",
            "id": 1,
            "image": "x",
            "isDestroyed": true,
            "name": "x"
          },
          "race": "x",
          "transformations": [
            {
              "deletedAt": "2026-01-01T00:00:00Z",
              "id": 1,
              "image": "x",
              "ki": "x",
              "name": "x"
            }
          ]
        }
      ],
      "meta": {
        "currentPage": 1,
        "itemCount": 1,
        "itemsPerPage": 1,
        "totalItems": 1,
        "totalPages": 1
      },
      "links": {
        "first": "x",
        "last": "x",
        "next": "x",
        "previous": "x"
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
    "query": [],
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
          "deletedAt": "2026-01-01T00:00:00Z",
          "id": 1,
          "image": "x",
          "ki": "x",
          "name": "x"
        }
      ],
      "originPlanet": {
        "deletedAt": "2026-01-01T00:00:00Z",
        "description": "x",
        "id": 1,
        "image": "x",
        "isDestroyed": true,
        "name": "x"
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
      "limit": "v1",
      "name": "v1",
      "page": "v1"
    },
    "headers": [],
    "query": [
      "page",
      "limit",
      "name"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "deletedAt": "2026-01-01T00:00:00Z",
          "description": "x",
          "id": 1,
          "image": "x",
          "isDestroyed": true,
          "name": "x"
        }
      ],
      "meta": {
        "currentPage": 1,
        "itemCount": 1,
        "itemsPerPage": 1,
        "totalItems": 1,
        "totalPages": 1
      },
      "links": {
        "first": "x",
        "last": "x",
        "next": "x",
        "previous": "x"
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
    "query": [],
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
      "limit": "v1",
      "page": "v1"
    },
    "headers": [],
    "query": [
      "page",
      "limit"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "deletedAt": "2026-01-01T00:00:00Z",
          "id": 1,
          "image": "x",
          "ki": "x",
          "name": "x"
        }
      ],
      "meta": {
        "currentPage": 1,
        "itemCount": 1,
        "itemsPerPage": 1,
        "totalItems": 1,
        "totalPages": 1
      },
      "links": {
        "first": "x",
        "last": "x",
        "next": "x",
        "previous": "x"
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
    "query": [],
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
