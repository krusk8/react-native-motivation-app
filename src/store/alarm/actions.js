import {getSnoozeMinutes, getFreeVersion} from '../selectors'

import {
  TIME_CHANGED,
  TIME_NEW,
  TIME_DELETE,
  SNOOZE_PRESSED,
  SNOOZE_DELETE,
  ENABLED_PRESSED,
  REPEAT_PRESSED,
  REPEAT_BUTTON_PRESSED,
  ALARM_STATE_LOADED
} from '../constants'

export const createTimeChanged = (id, hour, minute) => {
  return {
    type   : TIME_CHANGED,
    payload: {
      id, hour, minute
    }
  };
};

export const createTimeNew = () => {
  const action = {
    type: TIME_NEW
  };
  return action;
};

export const createTimeDelete = (id) => {
  const action = {
    type   : TIME_DELETE,
    payload: {
      id,
    }
  };
  return action;
};

export const createSnoozePressed = () =>  {
  const action = function (dispatch, getState) {
    return dispatch({
      type   : SNOOZE_PRESSED,
      payload: {
        snoozeMinutes: getSnoozeMinutes(getState()),
        freeVersion  : getFreeVersion(getState())
      }
    })
  };
  return action;
};

export const createSnoozeDelete = () =>  {
  const action = {
    type: SNOOZE_DELETE,
  };
  return action;
};

export const createTimeEnabledPressed = (id) =>  {
  const action = {
    type   : ENABLED_PRESSED,
    payload: {
      id,
    }
  };
  return action;
};

export const createTimeRepeatPressed = (id) =>  {
  const action = {
    type   : REPEAT_PRESSED,
    payload: {
      id
    }
  };
  return action;
};

export const createTimeRepeatButtonPressed = (id, dayKey) =>  {
  const action = {
    type   : REPEAT_BUTTON_PRESSED,
    payload: {
      id,
      dayKey
    }
  };
  return action;
};

export const createAlarmStateLoad = (stateString) =>  {
  const action = {
    type   : ALARM_STATE_LOADED,
    payload: {
      stateString
    }
  };
  return action;
};
