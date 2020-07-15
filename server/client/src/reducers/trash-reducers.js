import { CREATE_TRASH, GET_TRASH } from '../actions/index';

//this is the TrashReducer
export default function(state = [], action) {
  switch (action.type) {
    case CREATE_TRASH:
      return action.payload.data;
    case GET_TRASH:
      return action.payload.data;
    default:
      return state;
  }
}