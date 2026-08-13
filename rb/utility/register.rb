# DragonBall SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

DragonBallUtility.registrar = ->(u) {
  u.clean = DragonBallUtilities::Clean
  u.done = DragonBallUtilities::Done
  u.make_error = DragonBallUtilities::MakeError
  u.feature_add = DragonBallUtilities::FeatureAdd
  u.feature_hook = DragonBallUtilities::FeatureHook
  u.feature_init = DragonBallUtilities::FeatureInit
  u.fetcher = DragonBallUtilities::Fetcher
  u.make_fetch_def = DragonBallUtilities::MakeFetchDef
  u.make_context = DragonBallUtilities::MakeContext
  u.make_options = DragonBallUtilities::MakeOptions
  u.make_request = DragonBallUtilities::MakeRequest
  u.make_response = DragonBallUtilities::MakeResponse
  u.make_result = DragonBallUtilities::MakeResult
  u.make_point = DragonBallUtilities::MakePoint
  u.make_spec = DragonBallUtilities::MakeSpec
  u.make_url = DragonBallUtilities::MakeUrl
  u.param = DragonBallUtilities::Param
  u.prepare_auth = DragonBallUtilities::PrepareAuth
  u.prepare_body = DragonBallUtilities::PrepareBody
  u.prepare_headers = DragonBallUtilities::PrepareHeaders
  u.prepare_method = DragonBallUtilities::PrepareMethod
  u.prepare_params = DragonBallUtilities::PrepareParams
  u.prepare_path = DragonBallUtilities::PreparePath
  u.prepare_query = DragonBallUtilities::PrepareQuery
  u.graphql_body = DragonBallUtilities::GraphqlBody
  u.graphql_errors = DragonBallUtilities::GraphqlErrors
  u.result_basic = DragonBallUtilities::ResultBasic
  u.result_body = DragonBallUtilities::ResultBody
  u.result_headers = DragonBallUtilities::ResultHeaders
  u.transform_request = DragonBallUtilities::TransformRequest
  u.transform_response = DragonBallUtilities::TransformResponse
}
