import moment from 'moment'
import { formatTime } from '../../utils'

export function getSchedules(state) {
  const schedules = []
  const scheduleIds = state.scheduleIds
  scheduleIds.forEach(
        (id) => {
          const { enabled, time, doesRepeat } = state.schedulesById[id]
          let nextAlarmText = ''
          if (state.alarmsById[id]) {
            const timestamp = state.alarmsById[id].timestamp
            //il testo lo inizializzo solo in fase di rendering e non nello Store
            nextAlarmText = timestamp !== null ? moment(timestamp).calendar() : ''
          }
          const retObj = {
            id,
            enabled,
            time: formatTime(time),
            doesRepeat,
            nextAlarmText
          }
          schedules.push(retObj)
        },
    )
  return schedules
}

export function getSnooze(state) {
  const id = 'snooze'
  const { enabled } = state.schedulesById[id]
  let nextAlarmText = ''
  if (state.alarmsById[id]) {
    const timestamp = state.alarmsById[id].timestamp
    nextAlarmText = timestamp !== null ? moment(timestamp).calendar() : ''
  }
  return {
    id,
    enabled,
    nextAlarmText,
  }
}
