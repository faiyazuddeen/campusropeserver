import { Router } from "express";
import { middleware as query } from "querymen";
import {
  create,
  index,
  show,
  update,
  destroy,
  allconstants
} from "./controller";

const router = new Router();

/**
 * @api {post} /constants Create constant
 * @apiName CreateConstant
 * @apiGroup Constant
 * @apiSuccess {Object} constant Constant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Constant not found.
 */
router.post("/", create);

/**
 * @api {get} /constants Retrieve constants
 * @apiName RetrieveConstants
 * @apiGroup Constant
 * @apiUse listParams
 * @apiSuccess {Object[]} constants List of constants.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/", query(), index);

/**
 * @api {get} /constants/:id Retrieve constant
 * @apiName RetrieveConstant
 * @apiGroup Constant
 * @apiSuccess {Object} constant Constant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Constant not found.
 */
router.get("/:id", show);

/**
 * @api {put} /constants/:id Update constant
 * @apiName UpdateConstant
 * @apiGroup Constant
 * @apiSuccess {Object} constant Constant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Constant not found.
 */
router.put("/:id", update);

/**
 * @api {delete} /constants/:id Delete constant
 * @apiName DeleteConstant
 * @apiGroup Constant
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Constant not found.
 */
router.delete("/:id", destroy);

/**
 * @api {get} /constants/all get all constants as json
 * @apiName GetAllConstants
 * @apiSuccess (Success 200) 200 constants json.
 * @apiError 404 Constant not found.
 */
router.get("/all", allconstants);

export default router;
