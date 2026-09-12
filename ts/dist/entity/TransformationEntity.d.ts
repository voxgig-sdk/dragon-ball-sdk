import { DragonBallEntityBase } from '../DragonBallEntityBase';
import type { DragonBallSDK } from '../DragonBallSDK';
import type { Control } from '../types';
import type { Transformation, TransformationLoadMatch, TransformationListMatch } from '../DragonBallTypes';
declare class TransformationEntity extends DragonBallEntityBase<Transformation> {
    constructor(client: DragonBallSDK, entopts: any);
    make(this: TransformationEntity): TransformationEntity;
    load(this: any, reqmatch?: TransformationLoadMatch, ctrl?: Control): Promise<TransformationEntity>;
    list(this: any, reqmatch?: TransformationListMatch, ctrl?: Control): Promise<TransformationEntity[]>;
}
export { TransformationEntity };
