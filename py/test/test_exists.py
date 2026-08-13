# DragonBall SDK exists test

import pytest
from dragonball_sdk import DragonBallSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DragonBallSDK.test(None, None)
        assert testsdk is not None
