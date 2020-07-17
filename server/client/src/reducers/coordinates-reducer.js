import { SET_COORDINATES } from '../actions/index';

const defaultState = {latitude: null, longitude: null}

//this is the TrashReducer
export default function(state = {}, action) {
  switch (action.type) {
    case SET_COORDINATES:
      return action.payload
    default:
      return defaultState;
  }
}