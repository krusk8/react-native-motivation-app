import moment from 'moment'
import MockDate from 'mockdate'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { dayKeys } from '../../../src/constants'
import reducer, { defaultState, computeNextAlarmTimestamp, createScheduleObj, setSnooze } from '../../../src/store/alarm/reducer'
import * as settingsImports from '../../../src/store/settings/reducer'
import * as actions from '../../../src/store/alarm/actions'

function getFreshMockStore() {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  const mockStoreState = {
    settings: settingsImports.defaultState,
  }
  return mockStore(mockStoreState)
}

// http://momentjs.com/docs/#/get-set/day/
describe('moment.js', () => {
  it('moment.js weekday set in future', () => {
    const nextWednesday = moment('2016-11-15')
    nextWednesday.day(3)
    // 1 would then be yesterday 11-14
    const nextMonday = moment('2016-11-15')
    nextMonday.day(8)
    expect(nextWednesday.valueOf()).toBe(moment('2016-11-16').valueOf())
    expect(nextMonday.valueOf()).toBe(moment('2016-11-21').valueOf())
  })
})

describe('computeNextAlarmTimestamp', () => {
  let schedule
  beforeAll(() => {
    // Fake new Date() / moment() to use a hardcoded time
    const reference = moment('2016-11-15 12:00')    // Tuesday
    MockDate.set(reference.valueOf()) // 2016-11-15
  })
  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    schedule = moment()
  })


describe('createScheduleObj', () => {
  it('has the correct structure and values', () => {
    const expected = {
      id: 5,
      enabled: true,
      time: {
        hour: 2,
        minute: 20,
      },
      doesRepeat: false,
    }
    const answer = createScheduleObj(5, true, false, 2, 20)
    expect(answer).toMatchObject(expected)
  })
})

describe('setSnooze', () => {
  it('has the correct structure and values', () => {
    const timestamp = Date.now()
    const expected = {
      id: 'snooze',
      enabled: true,
      timestamp,
    }
    const snoozeObj = createScheduleObj('snooze', true, false)
    expect(setSnooze(snoozeObj, timestamp)).toMatchObject(expected)
  })
})

describe('alarm reducer', () => {
  it('defaultState is an object', () => {
    expect(defaultState).not.toBeUndefined()
  })

  it('initializes default state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })

  it('hydrates state upon app start', () => {
    const testState = {
      test: 'hello',
    }
    expect(reducer(undefined, actions.createAlarmStateLoad(JSON.stringify(testState)))).toEqual(testState)
  })

  it('hydrates previous state upon corrupt app start', () => {
    const testState = {
      test: 'hello',
    }
    expect(reducer(testState, actions.createAlarmStateLoad('GAGAGA'))).toEqual(testState)
  })

  it('creates a snooze timer', () => {
    const snoozeObj = createScheduleObj('snooze', true, false)
    const expected = {
      schedulesById: {
        snooze: snoozeObj,
      },
      alarmsById: {
        snooze: {
          id: 'snooze',
          enabled: true,
          /* timestamp */
        },
      },
    }
    const store = getFreshMockStore()
    const { freeVersion, snoozeMinutes } = store.getState().settings
    const payload = {
      freeVersion,
      snoozeMinutes,
    }
    const dispatch = jest.fn()
    actions.createSnoozePressed()(dispatch, store.getState)
    expect(dispatch).toHaveBeenCalledWith({ payload, type: 'SNOOZE_PRESSED' })
  })
})
