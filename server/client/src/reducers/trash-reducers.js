import { CREATE_TRASH } from '../actions/index';

//this is the ProductsReducer
export default function(state = null, action) {
  switch (action.type) {
    case CREATE_TRASH:
      return action.payload.data;
    default:
      return state;
  }
}