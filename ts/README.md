# DragonBall TypeScript SDK



The TypeScript SDK for the DragonBall API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Character()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/dragon-ball-sdk/releases](https://github.com/voxgig-sdk/dragon-ball-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { DragonBallSDK } from '@voxgig-sdk/dragon-ball'

const client = new DragonBallSDK()
```

### 2. List character records

`list()` resolves to an array of Character ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const characters = await client.Character().list()

for (const character of characters) {
  console.log(character)
}
```

### 3. Load a character

`load()` returns the entity directly and throws on failure:

```ts
try {
  const character = await client.Character().load({ id: 1 })
  console.log(character)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const planets = await client.Planet().list()
  console.log(planets)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = DragonBallSDK.test()

const planet = await client.Planet().list()
// planet is the entity, populated with mock response data
// — call planet.data() for the record itself
console.log(planet)
```

You can also use the instance method:

```ts
const client = new DragonBallSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new DragonBallSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DRAGON_BALL_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### DragonBallSDK

#### Constructor

```ts
new DragonBallSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Character(data?)` | `CharacterEntity` | Create a Character entity instance. |
| `Planet(data?)` | `PlanetEntity` | Create a Planet entity instance. |
| `Transformation(data?)` | `TransformationEntity` | Create a Transformation entity instance. |
| `tester(testopts?, sdkopts?)` | `DragonBallSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `DragonBallSDK.test(testopts?, sdkopts?)` | `DragonBallSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): DragonBallSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Character

| Field | Description |
| --- | --- |
| `affiliation` | Character's affiliation or allegiance |
| `deletedAt` | Deletion timestamp if character is deleted |
| `description` | Detailed description of the character |
| `gender` | Gender of the character |
| `id` | Unique identifier for the character |
| `image` | URL to character image |
| `ki` | Current ki (power level) of the character |
| `maxKi` | Maximum ki the character can achieve |
| `name` | Name of the character |
| `originPlanet` | Planet where the character originated |
| `race` | Race or species of the character |
| `transformations` | List of transformations available to the character |

Operations: list, load.

API path: `/characters`

#### Planet

| Field | Description |
| --- | --- |
| `deletedAt` | Deletion timestamp if planet is deleted |
| `description` | Detailed description of the planet |
| `id` | Unique identifier for the planet |
| `image` | URL to planet image |
| `isDestroyed` | Whether the planet has been destroyed |
| `name` | Name of the planet |

Operations: list, load.

API path: `/planets`

#### Transformation

| Field | Description |
| --- | --- |
| `deletedAt` | Deletion timestamp if transformation is deleted |
| `id` | Unique identifier for the transformation |
| `image` | URL to transformation image |
| `ki` | Ki level in this transformation |
| `name` | Name of the transformation |

Operations: list, load.

API path: `/transformations`



## Entities


### Character

Create an instance: `const character = client.Character()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | `string` | Character's affiliation or allegiance |
| `deletedAt` | `string` | Deletion timestamp if character is deleted |
| `description` | `string` | Detailed description of the character |
| `gender` | `string` | Gender of the character |
| `id` | `number` | Unique identifier for the character |
| `image` | `string` | URL to character image |
| `ki` | `string` | Current ki (power level) of the character |
| `maxKi` | `string` | Maximum ki the character can achieve |
| `name` | `string` | Name of the character |
| `originPlanet` | `Record<string, any>` | Planet where the character originated |
| `race` | `string` | Race or species of the character |
| `transformations` | `any[]` | List of transformations available to the character |

#### Example: Load

```ts
const character = await client.Character().load({ id: 1 })
```

#### Example: List

```ts
const characters = await client.Character().list()
```


### Planet

Create an instance: `const planet = client.Planet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deletedAt` | `string` | Deletion timestamp if planet is deleted |
| `description` | `string` | Detailed description of the planet |
| `id` | `number` | Unique identifier for the planet |
| `image` | `string` | URL to planet image |
| `isDestroyed` | `boolean` | Whether the planet has been destroyed |
| `name` | `string` | Name of the planet |

#### Example: Load

```ts
const planet = await client.Planet().load({ id: 1 })
```

#### Example: List

```ts
const planets = await client.Planet().list()
```


### Transformation

Create an instance: `const transformation = client.Transformation()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deletedAt` | `string` | Deletion timestamp if transformation is deleted |
| `id` | `number` | Unique identifier for the transformation |
| `image` | `string` | URL to transformation image |
| `ki` | `string` | Ki level in this transformation |
| `name` | `string` | Name of the transformation |

#### Example: Load

```ts
const transformation = await client.Transformation().load({ id: 1 })
```

#### Example: List

```ts
const transformations = await client.Transformation().list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
dragon-ball/
├── src/
│   ├── DragonBallSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { DragonBallSDK } from '@voxgig-sdk/dragon-ball'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const planet = client.Planet()
await planet.list()

// planet.data() now returns the planet data from the last `list`
// planet.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
