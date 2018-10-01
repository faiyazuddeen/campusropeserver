import { success, notFound } from "../../services/response/";
import { Admintask } from ".";

export const create = ({ body }, res, next) =>
  Admintask.create(body)
    .then(admintask => admintask.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Admintask.find(query, select, cursor)
    .then(admintasks => admintasks.map(admintask => admintask.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Admintask.findById(params.id)
    .then(notFound(res))
    .then(admintask => (admintask ? admintask.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ body, params }, res, next) =>
  Admintask.findById(params.id)
    .then(notFound(res))
    .then(
      admintask => (admintask ? Object.assign(admintask, body).save() : null)
    )
    .then(admintask => (admintask ? admintask.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Admintask.findById(params.id)
    .then(notFound(res))
    .then(admintask => (admintask ? admintask.remove() : null))
    .then(success(res, 204))
    .catch(next);
