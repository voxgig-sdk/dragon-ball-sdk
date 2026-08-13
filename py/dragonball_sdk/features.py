# DragonBall SDK feature factory

from dragonball_sdk.feature.base_feature import DragonBallBaseFeature
from dragonball_sdk.feature.test_feature import DragonBallTestFeature


def _make_feature(name):
    features = {
        "base": lambda: DragonBallBaseFeature(),
        "test": lambda: DragonBallTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
