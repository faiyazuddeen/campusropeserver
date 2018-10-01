import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
export UserProfile, { schema } from './model'

const router = new Router()

/**
 * @api {post} /user_profiles Create user profile
 * @apiName CreateUserProfile
 * @apiGroup UserProfile
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} userProfile User profile's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User profile not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  create)

/**
 * @api {get} /user_profiles Retrieve user profiles
 * @apiName RetrieveUserProfiles
 * @apiGroup UserProfile
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} userProfiles List of user profiles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /user_profiles/:id Retrieve user profile
 * @apiName RetrieveUserProfile
 * @apiGroup UserProfile
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} userProfile User profile's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User profile not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /user_profiles/:id Update user profile
 * @apiName UpdateUserProfile
 * @apiGroup UserProfile
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} userProfile User profile's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User profile not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  update)

/**
 * @api {delete} /user_profiles/:id Delete user profile
 * @apiName DeleteUserProfile
 * @apiGroup UserProfile
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User profile not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
