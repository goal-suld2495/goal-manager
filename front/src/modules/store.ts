import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  
});

export type RootState = ReturnType<typeof rootReducer>;

export function *rootSaga() {
  yield all([]);
} 

export default rootReducer;