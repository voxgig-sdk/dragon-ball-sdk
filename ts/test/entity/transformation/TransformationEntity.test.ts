

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DragonBallSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('TransformationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DRAGON_BALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('DRAGON_BALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DragonBallSDK.test()
    const ent = testsdk.Transformation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DRAGON_BALL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'transformation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"deletedAt","req":false,"short":"Deletion timestamp if transformation is deleted","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique identifier for the transformation","type":"`$INTEGER`","index$":1},{"active":true,"format":"uri","name":"image","req":false,"short":"URL to transformation image","type":"`$STRING`","index$":2},{"active":true,"name":"ki","req":false,"short":"Ki level in this transformation","type":"`$STRING`","index$":3},{"active":true,"name":"name","req":false,"short":"Name of the transformation","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"transformation","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /transformations","json":"{\"operationId\":\"getTransformations\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"items\":{\"items\":{\"properties\":{\"deletedAt\":{\"description\":\"Deletion timestamp if transformation is deleted\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the transformation\",\"type\":\"integer\"},\"image\":{\"description\":\"URL to transformation image\",\"format\":\"uri\",\"type\":\"string\"},\"ki\":{\"description\":\"Ki level in this transformation\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the transformation\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"links\":{\"properties\":{\"first\":{\"description\":\"Link to first page\",\"format\":\"uri\",\"type\":\"string\"},\"last\":{\"description\":\"Link to last page\",\"format\":\"uri\",\"type\":\"string\"},\"next\":{\"description\":\"Link to next page\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"previous\":{\"description\":\"Link to previous page\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"meta\":{\"properties\":{\"currentPage\":{\"description\":\"Current page number\",\"type\":\"integer\"},\"itemCount\":{\"description\":\"Number of items in current response\",\"type\":\"integer\"},\"itemsPerPage\":{\"description\":\"Number of items per page\",\"type\":\"integer\"},\"totalItems\":{\"description\":\"Total number of items available\",\"type\":\"integer\"},\"totalPages\":{\"description\":\"Total number of pages\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of transformations\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/transformations","segments":[{"lit":"transformations"}],"select":{"exist":["limit","page"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /transformations/{id}","json":"{\"operationId\":\"getTransformationById\",\"parameters\":[{\"description\":\"Unique identifier of the transformation\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"deletedAt\":{\"description\":\"Deletion timestamp if transformation is deleted\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the transformation\",\"type\":\"integer\"},\"image\":{\"description\":\"URL to transformation image\",\"format\":\"uri\",\"type\":\"string\"},\"ki\":{\"description\":\"Ki level in this transformation\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the transformation\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with transformation details\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Transformation not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/transformations/{id}","segments":[{"lit":"transformations"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"transformation","name__orig":"transformation","Name":"Transformation","name_":"transformation","name-":"transformation","NAME":"TRANSFORMATION","index$":2}, {"active":true,"entity":"transformation","key$":"BasicTransformationFlow","kind":"basic","name":"BasicTransformationFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"transformation_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"transformation_ref01","srcdatavar":"transformation_ref01_data","suffix":"_dt0"},"match":{"id":"transformation01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-transformation_ref01"}}],"index$":1}]}, 'Transformation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let transformation_ref01_data = Object.values(setup.data.existing.transformation)[0] as any

    // LIST
    const transformation_ref01_ent = client.Transformation()
    const transformation_ref01_match: any = {}

    const transformation_ref01_list = (await transformation_ref01_ent.list(transformation_ref01_match)).map((e: any) => e.data())


    // LOAD
    const transformation_ref01_match_dt0: any = {}
    transformation_ref01_match_dt0.id = transformation_ref01_data.id
    const transformation_ref01_data_dt0 = (await transformation_ref01_ent.load(transformation_ref01_match_dt0)).data()
    assert(transformation_ref01_data_dt0.id === transformation_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/transformation/TransformationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DragonBallSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['transformation01','transformation02','transformation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DRAGON_BALL_TEST_TRANSFORMATION_ENTID': idmap,
    'DRAGON_BALL_TEST_LIVE': 'FALSE',
    'DRAGON_BALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DRAGON_BALL_TEST_TRANSFORMATION_ENTID']

  const live = 'TRUE' === env.DRAGON_BALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DRAGON_BALL_TEST_TRANSFORMATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DragonBallSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
