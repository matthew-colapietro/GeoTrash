import { combineReducers } from "redux";
import TrashReducer from './trash-reducers'

//the result of the reducer data goes to the "", "campsite", "event" key
const rootReducer = combineReducers({
  trash: TrashReducer
});

export default rootReducer;