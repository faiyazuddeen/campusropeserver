import { success, notFound, authorOrAdmin } from '../../services/response/'
import { UserProfile } from '.'

export const create = ({ user, body }, res, next) =>
  UserProfile.create({ ...body, createdBy: user })
    .then((userProfile) => userProfile.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  UserProfile.find(query, select, cursor)
    .populate('createdBy')
    .then((userProfiles) => userProfiles.map((userProfile) => userProfile.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  UserProfile.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((userProfile) => userProfile ? userProfile.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, body, params }, res, next) =>
  UserProfile.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((userProfile) => userProfile ? Object.assign(userProfile, body).save() : null)
    .then((userProfile) => userProfile ? userProfile.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  UserProfile.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((userProfile) => userProfile ? userProfile.remove() : null)
    .then(success(res, 204))
    .catch(next)
