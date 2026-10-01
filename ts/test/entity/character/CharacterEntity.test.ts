

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


describe('CharacterEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DRAGON_BALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('DRAGON_BALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DragonBallSDK.test()
    const ent = testsdk.Character()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DRAGON_BALL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'character.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"affiliation":{"a":true,"h":"Affiliation","n":"affiliation","r":false,"sh":"Character's affiliation or allegiance","t":"`$STRING`","key$":"affiliation","index$":0},"deletedAt":{"a":true,"fo":"date-time","h":"Deleted At","n":"deletedAt","r":false,"sh":"Deletion timestamp if character is deleted","t":"`$STRING`","key$":"deletedAt","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Detailed description of the character","t":"`$STRING`","key$":"description","index$":2},"gender":{"a":true,"h":"Gender","n":"gender","r":false,"sh":"Gender of the character","t":"`$STRING`","key$":"gender","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the character","t":"`$INTEGER`","key$":"id","index$":4},"image":{"a":true,"fo":"uri","h":"Image","n":"image","r":false,"sh":"URL to character image","t":"`$STRING`","key$":"image","index$":5},"ki":{"a":true,"h":"Ki","n":"ki","r":false,"sh":"Current ki (power level) of the character","t":"`$STRING`","key$":"ki","index$":6},"maxKi":{"a":true,"h":"Max Ki","n":"maxKi","r":false,"sh":"Maximum ki the character can achieve","t":"`$STRING`","key$":"maxKi","index$":7},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the character","t":"`$STRING`","key$":"name","index$":8},"originPlanet":{"a":true,"h":"Origin Planet","n":"originPlanet","r":false,"sh":"Planet where the character originated","t":"`$OBJECT`","key$":"originPlanet","index$":9},"race":{"a":true,"h":"Race","n":"race","r":false,"sh":"Race or species of the character","t":"`$STRING`","key$":"race","index$":10},"transformations":{"a":true,"h":"Transformations","n":"transformations","r":false,"sh":"List of transformations available to the character","t":"`$ARRAY`","key$":"transformations","index$":11}},"id":{"field":"id","name":"id"},"name":"character","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /characters","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"affiliation","or":"affiliation","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"race","or":"race","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/characters","q":{"exist":["affiliation","limit","name","page","race"]},"r":{},"s":[{"lit":"characters"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /characters/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/characters/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"characters"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"character","name__orig":"character","Name":"Character","name_":"character","name-":"character","NAME":"CHARACTER","index$":0}, {"active":true,"entity":"character","key$":"BasicCharacterFlow","kind":"basic","name":"BasicCharacterFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"character_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"character_ref01","srcdatavar":"character_ref01_data","suffix":"_dt0"},"m":{"id":"character01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-character_ref01"}}],"index$":1}]}, 'Character', {"GET /characters":{"protocol":"http","parameters":[{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":1,"minimum":1},"index$":0},{"name":"limit","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","default":10,"minimum":1,"maximum":100},"index$":1},{"name":"name","in":"query","description":"Filter characters by name","required":false,"schema":{"type":"string"},"index$":2},{"name":"race","in":"query","description":"Filter characters by race","required":false,"schema":{"type":"string"},"index$":3},{"name":"affiliation","in":"query","description":"Filter characters by affiliation","required":false,"schema":{"type":"string"},"index$":4}]},"GET /characters/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"Unique identifier of the character","required":true,"schema":{"type":"integer"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let character_ref01_data = Object.values(setup.data.existing.character)[0] as any

    // LIST
    const character_ref01_ent = client.Character()
    const character_ref01_match: any = {}

    const character_ref01_list = (await character_ref01_ent.list(character_ref01_match)).map((e: any) => e.data())


    // LOAD
    const character_ref01_match_dt0: any = {}
    character_ref01_match_dt0.id = character_ref01_data.id
    const character_ref01_data_dt0 = (await character_ref01_ent.load(character_ref01_match_dt0)).data()
    assert(character_ref01_data_dt0.id === character_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/character/CharacterTestData.json')

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
    ['character01','character02','character03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DRAGON_BALL_TEST_CHARACTER_ENTID': idmap,
    'DRAGON_BALL_TEST_LIVE': 'FALSE',
    'DRAGON_BALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DRAGON_BALL_TEST_CHARACTER_ENTID']

  const live = 'TRUE' === env.DRAGON_BALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DRAGON_BALL_TEST_CHARACTER_ENTID']
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
  
