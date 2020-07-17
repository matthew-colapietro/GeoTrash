import { combineReducers } from "redux";
import TrashReducer from './trash-reducers'
import coordinateReducer from './coordinates-reducer'

//the result of the reducer data goes to the "", "campsite", "event" key
const rootReducer = combineReducers({
  trash: TrashReducer,
  coordinates: coordinateReducer
});

export default rootReducer;