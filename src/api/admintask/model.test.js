import { Admintask } from '.'

let admintask

beforeEach(async () => {
  admintask = await Admintask.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = admintask.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(admintask.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = admintask.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(admintask.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
