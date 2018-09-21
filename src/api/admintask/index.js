import { Router } from 'express'
import { middleware as query } from 'querymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
export Admintask, { schema } from './model'

const router = new Router()

/**
 * @api {post} /admintasks Create admintask
 * @apiName CreateAdmintask
 * @apiGroup Admintask
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} admintask Admintask's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Admintask not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  create)

/**
 * @api {get} /admintasks Retrieve admintasks
 * @apiName RetrieveAdmintasks
 * @apiGroup Admintask
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} admintasks List of admintasks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /admintasks/:id Retrieve admintask
 * @apiName RetrieveAdmintask
 * @apiGroup Admintask
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} admintask Admintask's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Admintask not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /admintasks/:id Update admintask
 * @apiName UpdateAdmintask
 * @apiGroup Admintask
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} admintask Admintask's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Admintask not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  update)

/**
 * @api {delete} /admintasks/:id Delete admintask
 * @apiName DeleteAdmintask
 * @apiGroup Admintask
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Admintask not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
