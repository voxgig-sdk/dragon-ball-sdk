

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"deletedAt":{"a":true,"fo":"date-time","h":"Deleted At","n":"deletedAt","r":false,"sh":"Deletion timestamp if transformation is deleted","t":"`$STRING`","key$":"deletedAt","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the transformation","t":"`$INTEGER`","key$":"id","index$":1},"image":{"a":true,"fo":"uri","h":"Image","n":"image","r":false,"sh":"URL to transformation image","t":"`$STRING`","key$":"image","index$":2},"ki":{"a":true,"h":"Ki","n":"ki","r":false,"sh":"Ki level in this transformation","t":"`$STRING`","key$":"ki","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the transformation","t":"`$STRING`","key$":"name","index$":4}},"id":{"field":"id","name":"id"},"name":"transformation","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /transformations","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/transformations","q":{"exist":["limit","page"]},"r":{},"s":[{"lit":"transformations"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /transformations/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/transformations/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"transformations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"transformation","name__orig":"transformation","Name":"Transformation","name_":"transformation","name-":"transformation","NAME":"TRANSFORMATION","index$":2}, {"active":true,"entity":"transformation","key$":"BasicTransformationFlow","kind":"basic","name":"BasicTransformationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"transformation_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"transformation_ref01","srcdatavar":"transformation_ref01_data","suffix":"_dt0"},"m":{"id":"transformation01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-transformation_ref01"}}],"index$":1}]}, 'Transformation', {"GET /transformations":{"protocol":"http","parameters":[{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":1,"minimum":1},"index$":0},{"name":"limit","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","default":10,"minimum":1,"maximum":100},"index$":1}]},"GET /transformations/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"Unique identifier of the transformation","required":true,"schema":{"type":"integer"},"index$":0}]}})
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
  
