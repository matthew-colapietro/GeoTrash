import { CREATE_TRASH, GET_TRASH, UPDATE_STATUS } from '../actions/index';

//this is the TrashReducer
export default function(state = [], action) {
  switch (action.type) {
    case CREATE_TRASH:
      return action.payload.data
    case GET_TRASH:
      if (action.payload.data) {
        console.log("Action.payload.data is: ", action.payload.data)
      };
      return action.payload.data
    case UPDATE_STATUS:
      return action.payload.data
    default:
      return state;
  }
}