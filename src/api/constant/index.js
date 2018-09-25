import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy ,adminTasks} from './controller'

const router = new Router()

/**
 * @api {post} /constants Create constant
 * @apiName CreateConstant
 * @apiGroup Constant
 * @apiSuccess {Object} constant Constant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Constant not found.
 */
router.post('/',
  create)

/**
 * @api {get} /constants Retrieve constants
 * @apiName RetrieveConstants
 * @apiGroup Constant
 * @apiUse listParams
 * @apiSuccess {Object[]} constants List of constants.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /constants/:id Retrieve constant
 * @apiName RetrieveConstant
 * @apiGroup Constant
 * @apiSuccess {Object} constant Constant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Constant not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /constants/:id Update constant
 * @apiName UpdateConstant
 * @apiGroup Constant
 * @apiSuccess {Object} constant Constant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Constant not found.
 */
router.put('/:id',
  update)

/**
 * @api {delete} /constants/:id Delete constant
 * @apiName DeleteConstant
 * @apiGroup Constant
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Constant not found.
 */
router.delete('/:id',
  destroy)

/**
 * @api {get} /constants/adminTask/json get Admin Tasks as json
 * @apiName adminTasks
 * @apiSuccess (Success 200) 200 admin Task Json.
 * @apiError 404 Constant not found.
 */
router.get('/adminTask/json',
  adminTasks)

export default router
