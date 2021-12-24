import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import memo from './memo';

const rootReducer = combineReducers({
  memo,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;
