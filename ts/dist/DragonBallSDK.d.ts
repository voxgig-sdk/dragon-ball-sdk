import { CharacterEntity } from './entity/CharacterEntity';
import { PlanetEntity } from './entity/PlanetEntity';
import { TransformationEntity } from './entity/TransformationEntity';
export type * from './DragonBallTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { DragonBallEntityBase } from './DragonBallEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class DragonBallSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Character(entopts?: Record<string, any>): CharacterEntity;
    Planet(entopts?: Record<string, any>): PlanetEntity;
    Transformation(entopts?: Record<string, any>): TransformationEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): DragonBallSDK;
    tester(testopts?: any, sdkopts?: any): DragonBallSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof DragonBallSDK;
export { stdutil, config, BaseFeature, DragonBallEntityBase, DragonBallSDK, SDK, };
export type { DirectResult };
