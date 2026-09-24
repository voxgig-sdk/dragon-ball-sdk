"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragonBallError = void 0;
class DragonBallError extends Error {
    isDragonBallError = true;
    sdk = 'DragonBall';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.DragonBallError = DragonBallError;
//# sourceMappingURL=DragonBallError.js.map