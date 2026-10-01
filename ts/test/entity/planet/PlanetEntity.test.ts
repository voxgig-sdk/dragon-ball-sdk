

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


describe('PlanetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DRAGON_BALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('DRAGON_BALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DragonBallSDK.test()
    const ent = testsdk.Planet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DRAGON_BALL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'planet.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"deletedAt":{"a":true,"fo":"date-time","h":"Deleted At","n":"deletedAt","r":false,"sh":"Deletion timestamp if planet is deleted","t":"`$STRING`","key$":"deletedAt","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Detailed description of the planet","t":"`$STRING`","key$":"description","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the planet","t":"`$INTEGER`","key$":"id","index$":2},"image":{"a":true,"fo":"uri","h":"Image","n":"image","r":false,"sh":"URL to planet image","t":"`$STRING`","key$":"image","index$":3},"isDestroyed":{"a":true,"h":"Is Destroyed","n":"isDestroyed","r":false,"sh":"Whether the planet has been destroyed","t":"`$BOOLEAN`","key$":"isDestroyed","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the planet","t":"`$STRING`","key$":"name","index$":5}},"id":{"field":"id","name":"id"},"name":"planet","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /planets","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/planets","q":{"exist":["limit","name","page"]},"r":{},"s":[{"lit":"planets"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /planets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/planets/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"planets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"planet","name__orig":"planet","Name":"Planet","name_":"planet","name-":"planet","NAME":"PLANET","index$":1}, {"active":true,"entity":"planet","key$":"BasicPlanetFlow","kind":"basic","name":"BasicPlanetFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"planet_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"planet_ref01","srcdatavar":"planet_ref01_data","suffix":"_dt0"},"m":{"id":"planet01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-planet_ref01"}}],"index$":1}]}, 'Planet', {"GET /planets":{"protocol":"http","parameters":[{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":1,"minimum":1},"index$":0},{"name":"limit","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","default":10,"minimum":1,"maximum":100},"index$":1},{"name":"name","in":"query","description":"Filter planets by name","required":false,"schema":{"type":"string"},"index$":2}]},"GET /planets/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"Unique identifier of the planet","required":true,"schema":{"type":"integer"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let planet_ref01_data = Object.values(setup.data.existing.planet)[0] as any

    // LIST
    const planet_ref01_ent = client.Planet()
    const planet_ref01_match: any = {}

    const planet_ref01_list = (await planet_ref01_ent.list(planet_ref01_match)).map((e: any) => e.data())


    // LOAD
    const planet_ref01_match_dt0: any = {}
    planet_ref01_match_dt0.id = planet_ref01_data.id
    const planet_ref01_data_dt0 = (await planet_ref01_ent.load(planet_ref01_match_dt0)).data()
    assert(planet_ref01_data_dt0.id === planet_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/planet/PlanetTestData.json')

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
    ['planet01','planet02','planet03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DRAGON_BALL_TEST_PLANET_ENTID': idmap,
    'DRAGON_BALL_TEST_LIVE': 'FALSE',
    'DRAGON_BALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DRAGON_BALL_TEST_PLANET_ENTID']

  const live = 'TRUE' === env.DRAGON_BALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DRAGON_BALL_TEST_PLANET_ENTID']
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
  
