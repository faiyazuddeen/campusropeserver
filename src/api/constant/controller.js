const adminTaskList = [
  {
    id: 1,
    taskName: 'Helpline',
    selected: false,
  },
  {
    id: 2,
    taskName: 'Trending News',
    selected: false,
  },
  {
    id: 3,
    taskName: 'Feed Commercials',
    selected: false,
  },
  {
    id: 4,
    taskName: 'Feed Contents',
    selected: false,
  },
  {
    id: 5,
    taskName: 'Help',
    selected: false,
  },
  {
    id: 6,
    taskName: 'Helpline',
    selected: false,
  },
  {
    id: 7,
    taskName: 'Approve NGO News',
    selected: false,
  },
  {
    id: 8,
    taskName: 'Trending News',
    selected: false,
  },
  {
    id: 9,
    taskName: 'NGO Verifications',
    selected: false,
  },
  {
    id: 10,
    taskName: 'Users/Notifications',
    selected: false,
  },
  {
    id: 11,
    taskName: 'Petitions and RTIs',
    selected: false,
  },
  {
    id: 12,
    taskName: 'Reported posts',
    selected: false,
  },
  {
    id: 13,
    taskName: 'Statistics',
    selected: false,
  },
  {
    id: 14,
    taskName: 'Suggestions/Feedback',
    selected: false,
  },
  {
    id: 15,
    taskName: 'Abuse Reports',
    selected: false,
  },
  {
    id: 16,
    taskName: 'About us',
    selected: false,
  },
];


export const create = ({ body }, res, next) =>
  res.status(201).json(body)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  res.status(200).json([])

export const show = ({ params }, res, next) =>
  res.status(200).json({})

export const update = ({ body, params }, res, next) =>
  res.status(200).json(body)

export const destroy = ({ params }, res, next) =>
  res.status(204).end()

export const adminTasks = (req, res) =>
  res.status(200).json(adminTaskList)
