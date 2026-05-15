# DragonBall SDK utility: make_context

from core.context import DragonBallContext


def make_context_util(ctxmap, basectx):
    return DragonBallContext(ctxmap, basectx)
