import { DragonBallEntityBase } from '../DragonBallEntityBase';
import type { DragonBallSDK } from '../DragonBallSDK';
import type { Control } from '../types';
import type { Character, CharacterLoadMatch, CharacterListMatch } from '../DragonBallTypes';
declare class CharacterEntity extends DragonBallEntityBase<Character> {
    constructor(client: DragonBallSDK, entopts: any);
    make(this: CharacterEntity): CharacterEntity;
    load(this: any, reqmatch?: CharacterLoadMatch, ctrl?: Control): Promise<CharacterEntity>;
    list(this: any, reqmatch?: CharacterListMatch, ctrl?: Control): Promise<CharacterEntity[]>;
}
export { CharacterEntity };
